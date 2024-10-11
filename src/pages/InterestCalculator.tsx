import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

interface InterestResult {
  totalInterest: number;
  maturityAmount: number;
  monthlyReport: MonthlyReport[];
  financialYearReport: FinancialYearReport[];
  totalDays: number;
}

interface MonthlyReport {
  date: string;
  interestAmount: number;
  balance: number;
}

interface FinancialYearReport {
  financialYear: string;
  interestAmount: number;
}

const InterestCalculator: React.FC = () => {
  const [result, setResult] = useState<InterestResult | null>(null);
  const [interestType, setInterestType] = useState('simple');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const calculationResult = calculateInterest(
      parseFloat(formData.get('principal') as string),
      parseFloat(formData.get('rate') as string),
      formData.get('start_date') as string,
      formData.get('end_date') as string,
      formData.get('interest_type') as string,
      formData.get('frequency') as string
    );
    setResult(calculationResult);
  };

  const calculateInterest = (
    principal: number,
    rate: number,
    startDate: string,
    endDate: string,
    interestType: string,
    frequency: string
  ): InterestResult => {
    let totalInterest = 0;
    let currentAmount = principal;
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    const totalDays = Math.ceil((endDateObj.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const monthlyReport: MonthlyReport[] = [];
    const financialYearReport: FinancialYearReport[] = [];
    let currentFinancialYear = getFinancialYear(currentDate);
    let financialYearInterest = 0;

    while (currentDate <= endDateObj) {
      let periodEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      if (periodEnd > endDateObj) {
        periodEnd = new Date(endDateObj);
      }
      
      const periodDays = (periodEnd.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000) + 1;
      let interestForPeriod = 0;

      if (interestType === 'simple') {
        interestForPeriod = currentAmount * (rate / 100) * (periodDays / 365);
      } else {
        const compoundFrequency = {
          'monthly': 12,
          'quarterly': 4,
          '6monthly': 2,
          'yearly': 1
        }[frequency as keyof typeof compoundFrequency];
        const periodYears = periodDays / 365;
        interestForPeriod = currentAmount * (Math.pow(1 + (rate / 100) / compoundFrequency, compoundFrequency * periodYears) - 1);
      }

      totalInterest += interestForPeriod;
      financialYearInterest += interestForPeriod;

      monthlyReport.push({
        date: formatDate(periodEnd),
        interestAmount: interestForPeriod,
        balance: currentAmount + (interestType === 'compound' ? interestForPeriod : 0)
      });

      if (interestType === 'compound') {
        currentAmount += interestForPeriod;
      }

      const nextFinancialYear = getFinancialYear(periodEnd);
      if (nextFinancialYear !== currentFinancialYear) {
        financialYearReport.push({
          financialYear: currentFinancialYear,
          interestAmount: financialYearInterest
        });
        currentFinancialYear = nextFinancialYear;
        financialYearInterest = 0;
      }

      currentDate = new Date(periodEnd);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (financialYearInterest > 0) {
      financialYearReport.push({
        financialYear: currentFinancialYear,
        interestAmount: financialYearInterest
      });
    }

    return {
      totalInterest,
      maturityAmount: principal + totalInterest,
      monthlyReport,
      financialYearReport,
      totalDays
    };
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getFinancialYear = (date: Date): string => {
    const year = date.getFullYear();
    return date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400 flex items-center justify-center"
      >
        <Calculator className="w-8 h-8 mr-2" />
        FD Interest Calculator
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="principal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Principal Amount
            </label>
            <input
              type="number"
              id="principal"
              name="principal"
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              name="rate"
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="interest_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Type
            </label>
            <select
              id="interest_type"
              name="interest_type"
              required
              onChange={(e) => setInterestType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="simple">Simple Interest</option>
              <option value="compound">Compound Interest</option>
            </select>
          </div>
          {interestType === 'compound' && (
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Compounding Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="6monthly">Semi-Annually</option>
                <option value="yearly">Annually</option>
              </select>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Calculate
          </button>
        </div>
      </motion.form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Interest Earned</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.totalInterest)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Maturity Amount</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.maturityAmount)}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Financial Year-wise Interest Amount</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Financial Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Interest Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {result.financialYearReport.map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{year.financialYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatCurrency(year.interestAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Monthly Interest Report</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Interest Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fixed Deposit Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {result.monthlyReport.map((month, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{month.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatCurrency(month.interestAmount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatCurrency(month.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InterestCalculator;