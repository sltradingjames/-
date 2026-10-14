/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppState, ServiceCategory } from './types';
import { loadAppState, saveAppState, resetAppStateToDefault } from './utils/storage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ProjectsGallery } from './components/ProjectsGallery';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileFloatingBar } from './components/MobileFloatingBar';
import { AdminModal } from './components/Admin/AdminModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => loadAppState());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Filter interaction between sections
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ServiceCategory | 'all'>('all');

  // Save changes to localStorage automatically
  const handleUpdateAppState = (newState: AppState) => {
    setAppState(newState);
    saveAppState(newState);
  };

  const handleResetToDefault = () => {
    const defaulted = resetAppStateToDefault();
    setAppState(defaulted);
  };

  // Smooth navigation to anchors
  const scrollToSection = (sectionId: string) => {
    if (isAdminView) {
      setIsAdminView(false);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // When clicking "시공사례 보기" from a Service card
  const handleSelectCategoryFilter = (cat: ServiceCategory) => {
    setActiveCategoryFilter(cat);
    scrollToSection('projects');
  };

  // Keep HTML document title in sync with company name and SEO title
  useEffect(() => {
    if (appState.seo.metaTitle) {
      document.title = appState.seo.metaTitle;
    }
  }, [appState.seo.metaTitle]);

  return (
    <div className={`min-h-screen flex flex-col font-sans ${appState.theme.darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* If Admin View is active, render the full admin dashboard */}
      {isAdminView ? (
        <AdminDashboard
          appState={appState}
          onUpdateState={handleUpdateAppState}
          onResetToDefault={handleResetToDefault}
          onCloseAdmin={() => setIsAdminView(false)}
        />
      ) : (
        <>
          {/* Main Visitor Header */}
          <Header
            company={appState.company}
            theme={appState.theme}
            isAdminLoggedIn={isAdminLoggedIn}
            isAdminView={isAdminView}
            onOpenAdminLogin={() => setIsAdminModalOpen(true)}
            onToggleAdminView={() => setIsAdminView(!isAdminView)}
            onLogoutAdmin={() => {
              setIsAdminLoggedIn(false);
              setIsAdminView(false);
            }}
            onNavigateSection={scrollToSection}
          />

          {/* Hero Section */}
          <Hero
            company={appState.company}
            theme={appState.theme}
            onNavigateSection={scrollToSection}
          />

          {/* Core Services Section */}
          <Services
            hotlinePhone={appState.company.hotlinePhone}
            onSelectCategoryFilter={handleSelectCategoryFilter}
          />

          {/* Project History & Portfolio */}
          <ProjectsGallery
            projects={appState.projects}
            hotlinePhone={appState.company.hotlinePhone}
            activeCategoryFilter={activeCategoryFilter}
            onFilterChange={(cat) => setActiveCategoryFilter(cat)}
          />

          {/* FAQ Section */}
          <FaqSection
            hotlinePhone={appState.company.hotlinePhone}
          />

          {/* Footer */}
          <Footer
            company={appState.company}
            onNavigateSection={scrollToSection}
            onOpenAdminLogin={() => setIsAdminModalOpen(true)}
          />

          {/* Mobile Bottom Floating Action Bar */}
          <MobileFloatingBar
            hotlinePhone={appState.company.hotlinePhone}
          />
        </>
      )}

      {/* Admin Login Modal (password: admin1914) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminModalOpen(false);
          setIsAdminView(true);
        }}
      />

    </div>
  );
}
