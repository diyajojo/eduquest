import React, { useState } from 'react';
import { X, User, Moon, Sun, Bell, Shield, Mail, School, Save } from 'lucide-react';

interface Profile {
  full_name: string;
  college_name: string;
  branch: string;
  year: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, profile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Personal Details', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Moon },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[600px] overflow-hidden flex flex-col md:flex-row mx-4 md:mx-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 md:p-6 flex-shrink-0 overflow-x-auto md:overflow-visible">
          <h2 className="font-noto text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 hidden md:block">Settings</h2>
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-left transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 flex-shrink-0">
            <h3 className="font-noto text-lg md:text-xl font-semibold text-gray-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl md:text-2xl font-bold border-4 border-white shadow-lg relative flex-shrink-0">
                    {profile.full_name.split(' ').map(n => n[0]).join('')}
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 md:p-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors">
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base md:text-lg">{profile.full_name}</h4>
                    <p className="text-sm text-gray-500">Student Account</p>
                  </div>
                </div>

                <div className="grid gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        defaultValue={profile.full_name}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        defaultValue={profile.college_name}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                      <input
                        type="text"
                        defaultValue={profile.branch}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <input
                        type="text"
                        defaultValue={profile.year}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        defaultValue="diya.jojo@mec.ac.in"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all bg-gray-50"
                        readOnly
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact admin to change email address</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-8 max-w-lg">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Sun className="h-5 w-5 text-orange-500" />
                    Appearance
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Dark Mode</p>
                        <p className="text-sm text-gray-500">Adjust the appearance of the dashboard</p>
                      </div>
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-gray-700">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about assignments via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-gray-700">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive alerts on your device</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 max-w-lg">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Shield className="h-6 w-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-900">Password & Security</h4>
                      <p className="text-sm text-orange-800 mt-1">
                        Manage your password and security settings to keep your account safe.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <Save className="h-4 w-4" />
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
