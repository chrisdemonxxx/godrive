import { useState } from 'react';
import { Copy, Check, Smartphone, CreditCard, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface UPIPaymentProps {
  amount: number;
  bookingNumber: string;
  onPaymentSubmit: (transactionId: string) => void;
  isSubmitting?: boolean;
}

export function UPIPayment({ amount, bookingNumber, onPaymentSubmit, isSubmitting }: UPIPaymentProps) {
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  
  const UPI_ID = import.meta.env.VITE_UPI_ID || 'meerm.u.s7772@axl';
  const UPI_NAME = import.meta.env.VITE_UPI_NAME || 'GoDrive';
  
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`GoDrive-${bookingNumber}`)}`;
  
  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleSubmit = () => {
    if (transactionId.trim().length >= 6) {
      onPaymentSubmit(transactionId.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-white text-center">
        <p className="text-sm opacity-90">Amount to Pay</p>
        <p className="text-3xl font-bold">₹{amount.toLocaleString('en-IN')}</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* UPI App Button */}
        <div>
          <a 
            href={upiLink}
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium text-lg"
          >
            <Smartphone className="w-6 h-6" />
            Pay with UPI App
          </a>
          <p className="text-xs text-gray-500 text-center mt-2">
            Opens GPay, PhonePe, Paytm, or your default UPI app
          </p>
        </div>
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-gray-500">or pay manually</span>
          </div>
        </div>
        
        {/* Manual UPI ID */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-2 font-medium">UPI ID</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white px-4 py-3 rounded-lg border-2 border-dashed border-gray-300">
              <code className="text-lg font-mono font-semibold text-gray-800">{UPI_ID}</code>
            </div>
            <Button 
              type="button"
              variant="outline" 
              size="sm" 
              onClick={copyUpiId}
              className="shrink-0 h-12 w-12"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2">✓ UPI ID copied!</p>
          )}
        </div>
        
        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            How to pay
          </p>
          <ol className="text-sm text-blue-800 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              Open any UPI app (GPay, PhonePe, Paytm)
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              Enter UPI ID: <code className="bg-blue-100 px-1 rounded">{UPI_ID}</code>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              Pay exactly <strong>₹{amount.toLocaleString('en-IN')}</strong>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              Copy Transaction ID/UTR from payment confirmation
            </li>
            <li className="flex gap-2">
              <span className="font-bold">5.</span>
              Paste below and submit
            </li>
          </ol>
        </div>
        
        {/* Transaction ID Input */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700">
            UPI Transaction ID / UTR Number <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="e.g., 412345678901"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="font-mono text-lg h-12"
            maxLength={20}
          />
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Find this in your UPI app → Transaction History → Payment Details
          </p>
          
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={transactionId.trim().length < 6 || isSubmitting}
            className="w-full h-12 text-lg"
            size="lg"
            variant="primary"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2" />
                Submitting...
              </>
            ) : (
              'I Have Completed Payment'
            )}
          </Button>
        </div>
        
        {/* Security Note */}
        <p className="text-xs text-gray-400 text-center">
          🔒 Your payment is secure. We'll verify and confirm your booking within 30 minutes.
        </p>
      </div>
    </div>
  );
}
