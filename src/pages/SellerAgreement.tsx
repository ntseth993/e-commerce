import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft, Upload, File } from 'lucide-react'
import { useAgreement } from '../context/AgreementContext'
import { useAuth } from '../context/AuthContext'

const SellerAgreement = () => {
  const { createAgreement, getSellerAgreement, isAgreementActive } = useAgreement()
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [terms, setTerms] = useState({
    commissionRate: 5,
    paymentSchedule: 'monthly',
    productLimit: 100,
    supportLevel: 'premium',
    duration: '12 months'
  })
  const [businessDetails, setBusinessDetails] = useState({
    businessName: '',
    tinNumber: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState({
    idDocument: null as File | null,
    businessLicense: null as File | null,
    taxCertificate: null as File | null
  })

  const existingAgreement = user ? getSellerAgreement(user.id) : null
  const hasActiveAgreement = user ? isAgreementActive(user.id) : false

  const handleFileUpload = (documentType: keyof typeof uploadedFiles, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }))
  }

  const handleSubmitAgreement = () => {
    if (!user) return

    // Convert files to base64 for storage (in a real app, you'd upload to a server)
    const processFiles = async () => {
      const documents: Record<string, string> = {}
      for (const [key, file] of Object.entries(uploadedFiles)) {
        if (file) {
          documents[key] = URL.createObjectURL(file) // In production, upload to server
        }
      }
      
      createAgreement({
        sellerId: user.id,
        sellerName: user.name || 'Seller Name',
        sellerEmail: user.email || 'seller@example.com',
        businessName: businessDetails.businessName || undefined,
        tinNumber: businessDetails.tinNumber || undefined,
        businessDocuments: {
          idDocument: documents.idDocument,
          businessLicense: documents.businessLicense,
          taxCertificate: documents.taxCertificate
        },
        terms
      })

      setShowForm(false)
      alert('Agreement request submitted! Please wait for admin approval.')
    }

    processFiles()
  }

  if (hasActiveAgreement && existingAgreement) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/seller-dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="text-green-500 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Active Agreement</h1>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">Your agreement is active and valid until {new Date(existingAgreement.expiresAt || '').toLocaleDateString()}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Agreement Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Agreement ID</span>
                    <span className="font-medium">{existingAgreement.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium">{new Date(existingAgreement.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Approved</span>
                    <span className="font-medium">{new Date(existingAgreement.approvedAt || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Expires</span>
                    <span className="font-medium">{new Date(existingAgreement.expiresAt || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Commission Rate</span>
                    <span className="font-medium">{existingAgreement.terms.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Payment Schedule</span>
                    <span className="font-medium capitalize">{existingAgreement.terms.paymentSchedule}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Product Limit</span>
                    <span className="font-medium">{existingAgreement.terms.productLimit}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Support Level</span>
                    <span className="font-medium capitalize">{existingAgreement.terms.supportLevel}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{existingAgreement.terms.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Link 
                to="/seller-subscription" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Proceed to Subscription
              </Link>
              <button className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Download Agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (existingAgreement && existingAgreement.status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/seller-dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Clock className="text-orange-500 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Agreement Pending</h1>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-orange-800 font-medium">Your agreement is currently pending admin approval.</p>
              <p className="text-orange-700 text-sm mt-2">Agreement ID: {existingAgreement.id}</p>
            </div>

            <div className="text-center py-8">
              <AlertCircle className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-gray-600 mb-4">Please wait for the admin to review and approve your agreement.</p>
              <p className="text-sm text-gray-500">You will be notified once the decision is made.</p>
            </div>

            <div className="mt-8">
              <Link 
                to="/seller-dashboard" 
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors block text-center"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (existingAgreement && existingAgreement.status === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/seller-dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <XCircle className="text-red-500 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Agreement Rejected</h1>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">Your agreement was rejected by the admin.</p>
              <p className="text-red-700 text-sm mt-2">Please contact support for more information.</p>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Submit New Agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/seller-dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <FileText className="text-purple-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Seller Agreement</h1>
          </div>

          {!showForm ? (
            <div>
              <p className="text-gray-600 mb-6">
                To start selling on our platform, you need to have an active agreement with us. 
                Please review the terms and submit your agreement request.
              </p>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-4">Standard Agreement Terms</h3>
                <ul className="space-y-2 text-purple-800">
                  <li>• Commission rate: 5% on all sales</li>
                  <li>• Monthly payment schedule</li>
                  <li>• Up to 100 products allowed</li>
                  <li>• Premium support included</li>
                  <li>• 12-month agreement duration</li>
                </ul>
              </div>

              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Request Agreement
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Business Information</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={businessDetails.businessName}
                    onChange={(e) => setBusinessDetails({...businessDetails, businessName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TIN Number</label>
                  <input
                    type="text"
                    value={businessDetails.tinNumber}
                    onChange={(e) => setBusinessDetails({...businessDetails, tinNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your Tax Identification Number"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6">Business Documents</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                      className="hidden"
                      id="idDocument"
                    />
                    <label htmlFor="idDocument" className="cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-600">
                        {uploadedFiles.idDocument ? uploadedFiles.idDocument.name : 'Click to upload ID document'}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business License</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('businessLicense', e.target.files[0])}
                      className="hidden"
                      id="businessLicense"
                    />
                    <label htmlFor="businessLicense" className="cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-600">
                        {uploadedFiles.businessLicense ? uploadedFiles.businessLicense.name : 'Click to upload business license'}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Certificate</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('taxCertificate', e.target.files[0])}
                      className="hidden"
                      id="taxCertificate"
                    />
                    <label htmlFor="taxCertificate" className="cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-600">
                        {uploadedFiles.taxCertificate ? uploadedFiles.taxCertificate.name : 'Click to upload tax certificate'}
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6">Agreement Terms</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                  <input
                    type="number"
                    value={terms.commissionRate}
                    onChange={(e) => setTerms({...terms, commissionRate: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    min="0"
                    max="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Schedule</label>
                  <select
                    value={terms.paymentSchedule}
                    onChange={(e) => setTerms({...terms, paymentSchedule: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Limit</label>
                  <input
                    type="number"
                    value={terms.productLimit}
                    onChange={(e) => setTerms({...terms, productLimit: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    min="1"
                    max="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Level</label>
                  <select
                    value={terms.supportLevel}
                    onChange={(e) => setTerms({...terms, supportLevel: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Duration</label>
                  <select
                    value={terms.duration}
                    onChange={(e) => setTerms({...terms, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="6 months">6 Months</option>
                    <option value="12 months">12 Months</option>
                    <option value="24 months">24 Months</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  By submitting this agreement, you agree to the terms and conditions outlined above. 
                  This agreement will be sent to the admin for approval.
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitAgreement}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Submit Agreement
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerAgreement
