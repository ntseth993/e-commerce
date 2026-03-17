import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, CheckCircle, XCircle, Clock, AlertCircle, Eye, User, Calendar, DollarSign, Building, Download, FileCheck } from 'lucide-react'
import { useAgreement } from '../context/AgreementContext'
import { Agreement } from '../context/AgreementContext'

const AdminAgreementManagement = () => {
  const { agreements, approveAgreement, rejectAgreement, getPendingAgreements } = useAgreement()
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  const pendingAgreements = getPendingAgreements()

  const handleApprove = async (agreementId: string) => {
    try {
      // Simulate API call to approve agreement
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      approveAgreement(agreementId, 'admin-001')
      
      // Simulate sending notification to seller
      alert(`Agreement ${agreementId} has been approved! Seller will be notified automatically.`)
      
      setSelectedAgreement(null)
    } catch (error) {
      alert('Error approving agreement. Please try again.')
    }
  }

  const handleReject = async (agreementId: string) => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection.')
      return
    }

    try {
      // Simulate API call to reject agreement
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      rejectAgreement(agreementId, 'admin-001', rejectReason)
      
      // Simulate sending notification to seller
      alert(`Agreement ${agreementId} has been rejected. Seller will be notified.`)
      
      setShowRejectModal(false)
      setRejectReason('')
      setSelectedAgreement(null)
    } catch (error) {
      alert('Error rejecting agreement. Please try again.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />
      case 'approved':
        return <CheckCircle className="text-green-600" size={20} />
      case 'rejected':
        return <XCircle className="text-red-600" size={20} />
      default:
        return <AlertCircle className="text-gray-600" size={20} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin-dashboard" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Agreement Management</h1>
          <p className="text-gray-600 mt-2">Review and manage seller agreements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full mr-4">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingAgreements.length}</p>
                <p className="text-sm text-gray-600">Pending Agreements</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {agreements.filter(a => a.status === 'approved').length}
                </p>
                <p className="text-sm text-gray-600">Approved Agreements</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{agreements.length}</p>
                <p className="text-sm text-gray-600">Total Agreements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Agreements */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending Agreements</h2>
          </div>
          
          {pendingAgreements.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-gray-600">No pending agreements at the moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pendingAgreements.map((agreement) => (
                <div key={agreement.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        {getStatusIcon(agreement.status)}
                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agreement.status)}`}>
                          {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Seller Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <User className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium text-gray-900 ml-2">{agreement.sellerName}</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium text-gray-900 ml-2">{agreement.sellerEmail}</span>
                            </div>
                            {agreement.businessName && (
                              <div className="flex items-center">
                                <Building className="text-gray-400 mr-2" size={16} />
                                <span className="text-gray-600">Business:</span>
                                <span className="font-medium text-gray-900 ml-2">{agreement.businessName}</span>
                              </div>
                            )}
                            {agreement.tinNumber && (
                              <div className="flex items-center">
                                <FileText className="text-gray-400 mr-2" size={16} />
                                <span className="text-gray-600">TIN:</span>
                                <span className="font-medium text-gray-900 ml-2">{agreement.tinNumber}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Calendar className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Requested:</span>
                              <span className="font-medium text-gray-900 ml-2">
                                {new Date(agreement.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Agreement Terms</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <DollarSign className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Commission:</span>
                              <span className="font-medium text-gray-900 ml-2">{agreement.terms.commissionRate}%</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Schedule:</span>
                              <span className="font-medium text-gray-900 ml-2 capitalize">{agreement.terms.paymentSchedule}</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Products:</span>
                              <span className="font-medium text-gray-900 ml-2">{agreement.terms.productLimit}</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="text-gray-400 mr-2" size={16} />
                              <span className="text-gray-600">Support:</span>
                              <span className="font-medium text-gray-900 ml-2 capitalize">{agreement.terms.supportLevel}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Duration: {agreement.terms.duration}</h5>
                        <p className="text-sm text-gray-600">
                          Expires on {new Date(agreement.expiresAt || '').toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedAgreement(agreement)}
                        className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(agreement.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm flex items-center"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Approve
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedAgreement(agreement)
                            setShowRejectModal(true)
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm flex items-center"
                        >
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agreement Details Modal */}
        {selectedAgreement && !showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Agreement Details</h3>
                <button
                  onClick={() => setSelectedAgreement(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Seller Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Seller Name</label>
                      <p className="font-medium text-gray-900">{selectedAgreement.sellerName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email Address</label>
                      <p className="font-medium text-gray-900">{selectedAgreement.sellerEmail}</p>
                    </div>
                    {selectedAgreement.businessName && (
                      <div>
                        <label className="text-sm text-gray-600">Business Name</label>
                        <p className="font-medium text-gray-900">{selectedAgreement.businessName}</p>
                      </div>
                    )}
                    {selectedAgreement.tinNumber && (
                      <div>
                        <label className="text-sm text-gray-600">TIN Number</label>
                        <p className="font-medium text-gray-900">{selectedAgreement.tinNumber}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm text-gray-600">Agreement ID</label>
                      <p className="font-medium text-gray-900">{selectedAgreement.id}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Status</label>
                      <div className="flex items-center">
                        {getStatusIcon(selectedAgreement.status)}
                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAgreement.status)}`}>
                          {selectedAgreement.status.charAt(0).toUpperCase() + selectedAgreement.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Terms & Conditions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Commission Rate</label>
                      <p className="font-medium text-gray-900">{selectedAgreement.terms.commissionRate}%</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Payment Schedule</label>
                      <p className="font-medium text-gray-900 capitalize">{selectedAgreement.terms.paymentSchedule}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Product Limit</label>
                      <p className="font-medium text-gray-900">{selectedAgreement.terms.productLimit} products</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Support Level</label>
                      <p className="font-medium text-gray-900 capitalize">{selectedAgreement.terms.supportLevel}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Duration</label>
                      <p className="font-medium text-gray-900">{selectedAgreement.terms.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAgreement.businessDocuments && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Business Documents</h4>
                  <div className="space-y-3">
                    {selectedAgreement.businessDocuments.idDocument && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileCheck className="text-green-600 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-900">ID Document</span>
                        </div>
                        <button
                          onClick={() => window.open(selectedAgreement.businessDocuments?.idDocument, '_blank')}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                        >
                          <Download size={14} className="mr-1" />
                          View
                        </button>
                      </div>
                    )}
                    {selectedAgreement.businessDocuments.businessLicense && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileCheck className="text-green-600 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-900">Business License</span>
                        </div>
                        <button
                          onClick={() => window.open(selectedAgreement.businessDocuments?.businessLicense, '_blank')}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                        >
                          <Download size={14} className="mr-1" />
                          View
                        </button>
                      </div>
                    )}
                    {selectedAgreement.businessDocuments.taxCertificate && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileCheck className="text-green-600 mr-2" size={16} />
                          <span className="text-sm font-medium text-gray-900">Tax Certificate</span>
                        </div>
                        <button
                          onClick={() => window.open(selectedAgreement.businessDocuments?.taxCertificate, '_blank')}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                        >
                          <Download size={14} className="mr-1" />
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setSelectedAgreement(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && selectedAgreement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Agreement</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Please provide a reason for rejecting this agreement..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setRejectReason('')
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(selectedAgreement.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700"
                >
                  Reject Agreement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAgreementManagement
