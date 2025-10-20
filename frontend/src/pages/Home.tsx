import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, FileText, AlertTriangle, Phone, Mail, 
  ChevronRight, ExternalLink, TrendingUp, Award, Globe,
  Lock, UserCheck, Database, Zap, BarChart3, ArrowRight,
  PlayCircle, Download, CheckCircle, Info, Calendar
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [showPM, setShowPM] = useState(true);
  const isHindi = i18n.language === 'hi';

  // Toggle between PM and HM images
  const toggleLeader = () => setShowPM(!showPM);

  const features = [
    {
      icon: FileText,
      title: isHindi ? 'शिकायत दर्ज करें' : 'Register a Complaint',
      description: isHindi ? 'साइबर अपराध की रिपोर्ट करें' : 'Report cyber crime incidents',
      link: '/complaints',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Database,
      title: isHindi ? 'शिकायत ट्रैक करें' : 'Track your Complaint',
      description: isHindi ? 'अपनी शिकायत की स्थिति जांचें' : 'Check status of your complaint',
      link: '/complaints',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: UserCheck,
      title: isHindi ? 'संदिग्ध की रिपोर्ट करें' : 'Report & Check Suspect',
      description: isHindi ? 'संदिग्ध गतिविधियों की जांच करें' : 'Report suspicious activities',
      link: '/alerts',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Users,
      title: isHindi ? 'साइबर वालंटियर' : 'Cyber Volunteers',
      description: isHindi ? 'साइबर सुरक्षा में योगदान दें' : 'Contribute to cyber safety',
      link: '/intelligence',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const statistics = [
    { label: isHindi ? 'कुल शिकायतें' : 'Total Complaints', value: '15,67,892', trend: '+12.5%' },
    { label: isHindi ? 'हल की गई' : 'Resolved Cases', value: '12,34,567', trend: '+8.3%' },
    { label: isHindi ? 'सक्रिय मामले' : 'Active Cases', value: '3,33,325', trend: '+15.7%' },
    { label: isHindi ? 'बरामद राशि' : 'Amount Recovered', value: '₹456 Cr', trend: '+22.1%' }
  ];

  const newsUpdates = [
    {
      date: '19 Oct 2024',
      title: 'New AI-powered fraud detection system launched',
      type: 'new',
      description: 'I4C and IndiaAI invite innovators, researchers, and entrepreneurs to be part of the CyberGuard AI Hackathon'
    },
    {
      date: '18 Oct 2024', 
      title: 'Public Notice regarding RTI Applications',
      type: 'notice',
      description: 'The Suspect Repository facility on the National Cybercrime Reporting Portal is available'
    },
    {
      date: '17 Oct 2024',
      title: 'Cyber Crime Prevention Guidelines Updated',
      type: 'update',
      description: 'New guidelines for online safety and fraud prevention have been released'
    },
    {
      date: '16 Oct 2024',
      title: 'Monthly Cybercrime Statistics Report',
      type: 'report',
      description: 'September 2024 cybercrime statistics and trends analysis now available'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">
      {/* Hero Section with Leader Images */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left - PM/HM Image */}
            <div className="flex justify-center">
              <div 
                onClick={toggleLeader}
                className="relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-green-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-full p-1 shadow-2xl transform transition-transform group-hover:scale-105">
                  {showPM ? (
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs font-bold text-gray-800">Hon'ble Prime Minister</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs font-bold text-gray-800">Hon'ble Home Minister</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-center mt-3 text-sm text-gray-600">Click to toggle</p>
              </div>
            </div>

            {/* Center - Main Content */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  {isHindi ? 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल' : 'National Cyber Crime Reporting Portal'}
                </h1>
                <p className="text-xl text-gray-600">
                  {isHindi ? 'भारत की डिजिटल सुरक्षा' : "Securing India's Digital Future"}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
                  <h2 className="text-3xl font-bold mb-2">1930</h2>
                  <p className="text-lg">{isHindi ? 'राष्ट्रीय हेल्पलाइन' : 'National Helpline'}</p>
                  <p className="text-sm text-blue-100 mt-2">
                    {isHindi ? '24x7 साइबर अपराध सहायता' : '24x7 Cyber Crime Assistance'}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link to="/dashboard" className="btn-premium-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>{isHindi ? 'डैशबोर्ड' : 'Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/complaints" className="btn-premium-orange flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>{isHindi ? 'शिकायत दर्ज करें' : 'File Complaint'}</span>
                </Link>
              </div>
            </div>

            {/* Right - HM/PM Image */}
            <div className="flex justify-center">
              <div 
                onClick={toggleLeader}
                className="relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-orange-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-full p-1 shadow-2xl transform transition-transform group-hover:scale-105">
                  {!showPM ? (
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs font-bold text-gray-800">Hon'ble Prime Minister</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs font-bold text-gray-800">Hon'ble Home Minister</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-center mt-3 text-sm text-gray-600">Click to toggle</p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-12 text-center">
            <p className="text-lg italic text-gray-700">
              {isHindi 
                ? '"आधुनिक टेक्नोलॉजी के इस्तेमाल के कारण साइबर सुरक्षा वर्तमान जीवन का अभिन्न अंग बन गया है"'
                : '"Cyber security has become an integral part of modern life due to the use of technology"'}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isHindi ? 'त्वरित सेवाएं' : 'Quick Services'}
            </h2>
            <p className="text-gray-600">
              {isHindi ? 'साइबर अपराध से संबंधित सभी सेवाएं एक ही स्थान पर' : 'All cyber crime related services at one place'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary-600 font-semibold text-sm">
                      <span>{isHindi ? 'जानें और' : 'Learn more'}</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isHindi ? 'साइबर अपराध सांख्यिकी' : 'Cyber Crime Statistics'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 mb-2">{stat.label}</div>
                <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary-600" />
                {isHindi ? "क्या नया है" : "What's New"}
              </h2>
              <Link to="/reports" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                {isHindi ? 'सभी देखें' : 'View All'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {newsUpdates.map((news, index) => (
                <div key={index} className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{news.date}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start gap-2">
                      {news.type === 'new' && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">NEW</span>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{news.title}</h3>
                        <p className="text-sm text-gray-600">{news.description}</p>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isHindi ? 'साइबर सुरक्षित भारत' : 'Cyber Safe India'}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {isHindi 
              ? 'आइए मिलकर भारत को साइबर अपराधों से मुक्त बनाएं'
              : "Let's work together to make India free from cyber crimes"}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="btn-premium-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              <span>{isHindi ? 'जागरूकता वीडियो' : 'Awareness Videos'}</span>
            </button>
            <button className="btn-premium-orange flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span>{isHindi ? 'दिशानिर्देश डाउनलोड करें' : 'Download Guidelines'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}