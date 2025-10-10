import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Header
      "ministry": "Ministry of Home Affairs, Government of India",
      "helpline": "1930 (Cybercrime Helpline)",
      "email": "support@cybercrime.gov.in",
      "systemActive": "System Active",
      "language": "Language",
      
      // Navigation
      "dashboard": "Dashboard",
      "riskHeatmap": "Risk Heatmap",
      "alerts": "Alerts",
      "aiModels": "AI Models",
      "intelligence": "Intelligence",
      "cases": "Cases",
      "complaints": "Complaints",
      "banks": "Banks",
      "reports": "Reports",
      "admin": "Admin",
      "audit": "Audit",
      
      // Dashboard
      "welcomeBack": "Welcome back",
      "cwriTitle": "CWRI Portal",
      "cwriSubtitle": "Cash Withdrawal Risk Intelligence",
      "commandCenter": "Cash Withdrawal Risk Intelligence - Command Center",
      "lastSync": "Last Sync",
      "systemOperational": "System Operational",
      
      // Quick Actions
      "riskMap": "Risk Map",
      "viewHeatmap": "View Heatmap",
      "activeCases": "Cases",
      "generateReports": "Reports",
      "generate": "Generate",
      
      // Stats Cards
      "todayComplaints": "Today's Complaints",
      "predictedHotspots": "Predicted Hotspots",
      "activeAlerts": "Active Alerts",
      "recoveredToday": "Recovered Today",
      "vsYesterday": "vs yesterday",
      "aiPowered": "AI Powered",
      "next24h": "Next 24h",
      "urgent": "Urgent",
      "needsAction": "Needs Action",
      "success": "Success",
      "recoveryRate": "Recovery Rate",
      
      // Alerts
      "criticalAlerts": "Critical Alerts & Predictions",
      "viewAll": "View All",
      "liveActivityFeed": "Live Activity Feed",
      "viewFullHistory": "View Full History",
      
      // Status
      "new": "New",
      "acknowledged": "Acknowledged",
      "investigating": "Investigating",
      "resolved": "Resolved",
      "falsePosive": "False Positive",
      
      // Login
      "emailAddress": "Email Address",
      "password": "Password",
      "loginToDashboard": "Login to Dashboard",
      "loggingIn": "Logging in...",
      "or": "or",
      "demoLogin": "Demo Login (One Click)",
      "instantAccess": "Instant access with pre-configured credentials",
      "secureLogin": "Secure Login • 256-bit Encryption",
      "poweredByAI": "Powered by AI",
      
      // Common
      "loading": "Loading",
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete",
      "edit": "Edit",
      "search": "Search",
      "filter": "Filter",
      "export": "Export",
      "import": "Import",
      "close": "Close",
      "submit": "Submit",
      "reset": "Reset",
      "active": "Active",
      "inactive": "Inactive",
      "live": "Live",
      
      // Dashboard Stats
      "casesResolvedToday": "Cases Resolved Today",
      "activeLEAOfficers": "Active LEA Officers",
      "avgResponseTime": "Avg Response Time",
      "fromYesterday": "from yesterday",
      "improvement": "improvement",
      "acrossStates": "Across 15 states",
      
      // Alerts
      "predictedAmount": "Predicted Amount",
      "confidence": "Confidence",
      "acknowledge": "Acknowledge",
      "deployTeam": "Deploy Team",
      "details": "Details",
      "critical": "Critical",
      "high": "High",
      "medium": "Medium",
      "low": "Low",
      
      // Charts
      "weeklyTrendAnalysis": "Weekly Trend Analysis",
      "complaintsVsResolved": "Complaints vs Resolved",
      "crimeTypeDistribution": "Crime Type Distribution",
      "byCategory": "By Category",
      "topStatesByCases": "Top States by Cases",
      "currentMonth": "Current Month",
      "recoveryTrend": "Recovery Trend",
      "amountInLakhs": "Amount in Lakhs (₹)",
      "realTimeFraudPrevention": "Real-time Fraud Prevention",
      "24HourPerformance": "24-Hour Performance",
      "prevented": "Prevented",
      "failed": "Failed",
      "intervened": "Total Interventions",
      "responseTimeAnalysis": "Response Time Analysis",
      "avgVsTarget": "Avg vs Target (minutes)",
      "criticalAlertsText": "Critical Alerts",
      "highPriority": "High Priority",
      "mediumPriority": "Medium Priority",
      "standard": "Standard",
      "aiPredictiveAccuracy": "AI Predictive Accuracy",
      "mlModelPerformance": "ML Model Performance",
      "accuracy": "Accuracy %",
      "predictionsMade": "Predictions Made",
      "fundRecoveryPipeline": "Fund Recovery Pipeline",
      "todaysFunnelAnalysis": "Today's Funnel Analysis",
      "alertsGenerated": "Alerts Generated",
      "fundsBlocked": "Funds Blocked",
      "investigations": "Investigations",
      "recovered": "Recovered",
      
      // Funnel stages
      "complaintsStage": "Complaints",
      "alertsGeneratedStage": "Alerts Generated",
      "fundsBlockedStage": "Funds Blocked",
      "investigationsStage": "Investigations",
      "recoveredStage": "Recovered",
      "conversionRate": "Conversion Rate",
      "fromComplaintToRecovery": "From complaint to recovery",
      "current": "Current",
      "avgResponse": "Avg Response",
      "target": "Target",
      
      // Additional missing translations
      "systemAdministrator": "System Administrator",
      "admin": "Admin",
      "officer": "Officer",
      "vsYesterdayLabel": "vs yesterday",
    }
  },
  hi: {
    translation: {
      // Header
      "ministry": "गृह मंत्रालय, भारत सरकार",
      "helpline": "1930 (साइबर अपराध हेल्पलाइन)",
      "email": "support@cybercrime.gov.in",
      "systemActive": "सिस्टम सक्रिय",
      "language": "भाषा",
      
      // Navigation
      "dashboard": "डैशबोर्ड",
      "riskHeatmap": "जोखिम हीटमैप",
      "alerts": "अलर्ट",
      "aiModels": "AI मॉडल",
      "intelligence": "खुफिया",
      "cases": "मामले",
      "complaints": "शिकायतें",
      "banks": "बैंक",
      "reports": "रिपोर्ट",
      "admin": "व्यवस्थापक",
      "audit": "ऑडिट",
      
      // Dashboard
      "welcomeBack": "वापसी पर स्वागत है",
      "cwriTitle": "CWRI पोर्टल",
      "cwriSubtitle": "नकद निकासी जोखिम खुफिया",
      "commandCenter": "नकद निकासी जोखिम खुफिया - कमांड सेंटर",
      "lastSync": "अंतिम समन्वयन",
      "systemOperational": "सिस्टम परिचालन",
      
      // Quick Actions
      "riskMap": "जोखिम मानचित्र",
      "viewHeatmap": "हीटमैप देखें",
      "activeAlerts": "सक्रिय अलर्ट",
      "activeCases": "मामले",
      "generateReports": "रिपोर्ट",
      "generate": "उत्पन्न करें",
      
      // Stats Cards
      "todayComplaints": "आज की शिकायतें",
      "predictedHotspots": "अनुमानित हॉटस्पॉट",
      "activeAlerts": "सक्रिय अलर्ट",
      "recoveredToday": "आज बरामद",
      "vsYesterday": "बनाम कल",
      "aiPowered": "AI संचालित",
      "next24h": "अगले 24 घंटे",
      "urgent": "तत्काल",
      "needsAction": "कार्रवाई की जरूरत",
      "success": "सफलता",
      "recoveryRate": "वसूली दर",
      
      // Alerts
      "criticalAlerts": "महत्वपूर्ण अलर्ट और भविष्यवाणियां",
      "viewAll": "सभी देखें",
      "liveActivityFeed": "लाइव गतिविधि फ़ीड",
      "viewFullHistory": "पूर्ण इतिहास देखें",
      
      // Status
      "new": "नया",
      "acknowledged": "स्वीकृत",
      "investigating": "जांच चल रही है",
      "resolved": "हल हो गया",
      "falsePositive": "गलत सकारात्मक",
      
      // Login
      "emailAddress": "ईमेल पता",
      "password": "पासवर्ड",
      "loginToDashboard": "डैशबोर्ड में लॉगिन करें",
      "loggingIn": "लॉगिन हो रहा है...",
      "or": "या",
      "demoLogin": "डेमो लॉगिन (एक क्लिक)",
      "instantAccess": "पूर्व-कॉन्फ़िगर क्रेडेंशियल्स के साथ त्वरित पहुंच",
      "secureLogin": "सुरक्षित लॉगिन • 256-बिट एन्क्रिप्शन",
      "poweredByAI": "AI द्वारा संचालित",
      
      // Common
      "loading": "लोड हो रहा है",
      "save": "सहेजें",
      "cancel": "रद्द करें",
      "delete": "हटाएं",
      "edit": "संपादित करें",
      "search": "खोजें",
      "filter": "फ़िल्टर",
      "export": "निर्यात",
      "import": "आयात",
      "close": "बंद करें",
      "submit": "जमा करें",
      "reset": "रीसेट",
      "active": "सक्रिय",
      "inactive": "निष्क्रिय",
      "live": "लाइव",
      
      // Dashboard Stats
      "casesResolvedToday": "आज हल किए गए मामले",
      "activeLEAOfficers": "सक्रिय LEA अधिकारी",
      "avgResponseTime": "औसत प्रतिक्रिया समय",
      "fromYesterday": "कल से",
      "improvement": "सुधार",
      "acrossStates": "15 राज्यों में",
      
      // Alerts
      "predictedAmount": "अनुमानित राशि",
      "confidence": "विश्वास",
      "acknowledge": "स्वीकार करें",
      "deployTeam": "टीम तैनात करें",
      "details": "विवरण",
      "critical": "महत्वपूर्ण",
      "high": "उच्च",
      "medium": "मध्यम",
      "low": "कम",
      
      // Charts
      "weeklyTrendAnalysis": "साप्ताहिक प्रवृत्ति विश्लेषण",
      "complaintsVsResolved": "शिकायतें बनाम हल",
      "crimeTypeDistribution": "अपराध प्रकार वितरण",
      "byCategory": "श्रेणी के अनुसार",
      "topStatesByCases": "मामलों द्वारा शीर्ष राज्य",
      "currentMonth": "वर्तमान महीना",
      "recoveryTrend": "वसूली प्रवृत्ति",
      "amountInLakhs": "लाख में राशि (₹)",
      "realTimeFraudPrevention": "वास्तविक समय धोखाधड़ी रोकथाम",
      "24HourPerformance": "24 घंटे प्रदर्शन",
      "prevented": "रोका गया",
      "failed": "विफल",
      "intervened": "कुल हस्तक्षेप",
      "responseTimeAnalysis": "प्रतिक्रिया समय विश्लेषण",
      "avgVsTarget": "औसत बनाम लक्ष्य (मिनट)",
      "criticalAlertsText": "महत्वपूर्ण अलर्ट",
      "highPriority": "उच्च प्राथमिकता",
      "mediumPriority": "मध्यम प्राथमिकता",
      "standard": "मानक",
      "aiPredictiveAccuracy": "AI भविष्यवाणी सटीकता",
      "mlModelPerformance": "ML मॉडल प्रदर्शन",
      "accuracy": "सटीकता %",
      "predictionsMade": "की गई भविष्यवाणियां",
      "fundRecoveryPipeline": "फंड रिकवरी पाइपलाइन",
      "todaysFunnelAnalysis": "आज का फ़नल विश्लेषण",
      "alertsGenerated": "उत्पन्न अलर्ट",
      "fundsBlocked": "अवरुद्ध फंड",
      "investigations": "जांच",
      "recovered": "बरामद",
      
      // Funnel stages
      "complaintsStage": "शिकायतें",
      "alertsGeneratedStage": "उत्पन्न अलर्ट",
      "fundsBlockedStage": "अवरुद्ध फंड",
      "investigationsStage": "जांच",
      "recoveredStage": "बरामद",
      "conversionRate": "परिवर्तन दर",
      "fromComplaintToRecovery": "शिकायत से वसूली तक",
      "current": "वर्तमान",
      "avgResponse": "औसत प्रतिक्रिया",
      "target": "लक्ष्य",
      
      // Additional missing translations
      "systemAdministrator": "सिस्टम प्रशासक",
      "admin": "प्रशासक",
      "officer": "अधिकारी",
      "vsYesterdayLabel": "बनाम कल",
    }
  }
};

// Utility function to convert numbers to Hindi numerals
export const toHindiNumber = (num: number | string, language: string): string => {
  if (language !== 'hi') return String(num);
  
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/\d/g, (digit) => hindiDigits[parseInt(digit)]);
};

// Utility function to format numbers with locale support
export const formatNumber = (num: number, language: string): string => {
  if (language === 'hi') {
    const formatted = num.toLocaleString('en-IN');
    return toHindiNumber(formatted, language);
  }
  return num.toLocaleString('en-IN');
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
