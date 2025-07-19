// components/SettingsPage.js
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

const contentData = {
  'privacy-security': {
    title: 'Privacy Policy',
    date: 'Dec 4, 2019 21:42',
    text: `<h1>Privacy Policy</h1><p>1. Information We Collect</p>...`,
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    date: 'Dec 4, 2019 21:42',
    text: `<h1>Terms & Conditions</h1><p>1. Acceptance of Terms</p>...`,
  },
  'about-us': {
    title: 'About Us',
    date: 'Dec 4, 2019 21:42',
    text: `<h1>Welcome to [Your Company Name]!</h1><p>We are dedicated to...</p>`,
  },
  faqs: {
    title: 'FAQs',
    date: 'Dec 4, 2019 21:42',
    questions: [
      { id: 1, question: 'What is your refund policy?', answer: '<p>Our refund policy states that...</p>' },
      { id: 2, question: 'How do I reset my password?', answer: '<p>You can reset your password by...</p>' },
      { id: 3, question: 'How can I contact support?', answer: '<p>You can contact support via...</p>' },
    ],
  },
};

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const SettingsPage = ({ onBackClick }) => {
  const editor = useRef(null);
  const [activeTab, setActiveTab] = useState('privacy-security');
  const [editableContent, setEditableContent] = useState('');
  const [faqs, setFaqs] = useState(contentData.faqs.questions || []);
  const [selectedFaq, setSelectedFaq] = useState(faqs.length > 0 ? faqs[0] : null);
  const [tabContents, setTabContents] = useState(contentData);

  useEffect(() => {
    if (activeTab === 'faqs') {
      if (!selectedFaq || !faqs.some(faq => faq.id === selectedFaq.id)) {
        setSelectedFaq(faqs.length > 0 ? faqs[0] : null);
      }
      setEditableContent(selectedFaq ? selectedFaq.answer : '');
    } else {
      setEditableContent(tabContents[activeTab].text);
    }
  }, [activeTab, tabContents, faqs, selectedFaq]);

  const joditConfig = useMemo(() => ({
    readonly: false,
    spellcheck: false,
    buttons: 'undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source',
    theme: 'dark',
    toolbarButtonSize: 'large',
  }), []);

  const handleSaveAndChange = () => {
    if (activeTab === 'faqs' && selectedFaq) {
      setFaqs(prev =>
        prev.map(faq =>
          faq.id === selectedFaq.id ? { ...faq, question: selectedFaq.question, answer: editableContent } : faq
        )
      );
      showConfirmation(`FAQ "${selectedFaq.question}" updated!`);
    } else {
      setTabContents(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], text: editableContent },
      }));
      showConfirmation(`Content for "${tabContents[activeTab].title}" saved!`);
    }
  };

  const showConfirmation = (message) => {
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    confirmDialog.innerHTML = `
      <div class="bg-[#343434] p-6 rounded-lg shadow-lg text-white">
        <p class="mb-4">${message}</p>
        <button id="confirmOkBtn" class="bg-cyan-400 hover:bg-cyan-300 text-white py-2 px-4 rounded-[4px] border-b-4 border-lime-400">OK</button>
      </div>
    `;
    document.body.appendChild(confirmDialog);
    document.getElementById('confirmOkBtn').onclick = () => {
      document.body.removeChild(confirmDialog);
    };
  };

  const handleQuestionChange = (e) => {
    if (selectedFaq) {
      setSelectedFaq({ ...selectedFaq, question: e.target.value });
    }
  };

  const handleFaqSelection = (faqId) => {
    const selected = faqs.find(faq => faq.id === faqId);
    setSelectedFaq(selected);
    setEditableContent(selected.answer);
  };

  const handleAddFaq = () => {
    const newId = faqs.length > 0 ? Math.max(...faqs.map(faq => faq.id)) + 1 : 1;
    const newFaq = { id: newId, question: 'New Question', answer: '<p>New Answer</p>' };
    setFaqs(prev => [...prev, newFaq]);
    setSelectedFaq(newFaq);
    setEditableContent(newFaq.answer);
  };

  const handleDeleteFaq = () => {
    if (selectedFaq) {
      const confirmDialog = document.createElement('div');
      confirmDialog.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
      confirmDialog.innerHTML = `
        <div class="bg-[#343434] p-6 rounded-lg shadow-lg text-white">
          <p class="mb-4">Are you sure you want to delete "${selectedFaq.question}"?</p>
          <div class="flex justify-end gap-2">
            <button id="confirmCancelBtn" class="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-[4px]">Cancel</button>
            <button id="confirmDeleteBtn" class="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-[4px]">Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmDialog);
      document.getElementById('confirmDeleteBtn').onclick = () => {
        setFaqs(prev => prev.filter(faq => faq.id !== selectedFaq.id));
        setSelectedFaq(null);
        setEditableContent('');
        document.body.removeChild(confirmDialog);
      };
      document.getElementById('confirmCancelBtn').onclick = () => {
        document.body.removeChild(confirmDialog);
      };
    }
  };

  return (
    <div className="bg-[#343434] rounded-2xl min-h-screen text-white p-6 sm:p-6 lg:p-8 font-inter">
      <div className="flex items-center mb-6">
        {onBackClick && (
          <button onClick={onBackClick} className="text-light-gray-text hover:text-white mr-4" aria-label="Go back">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
      </div>

      <div className="border-b border-gray-700">
        <div className="md:w-full flex justify-start bg-dark-bg rounded-t-lg overflow-x-auto scrollbar-hide">
          {['privacy-security', 'terms-conditions', 'about-us', 'faqs'].map((tabId) => (
            <button
              key={tabId}
              className={`flex-shrink-0 px-4 py-4 text-lg font-medium relative ${
                activeTab === tabId ? 'text-[#00C1C9]' : 'text-light-gray-text hover:text-white'
              }`}
              onClick={() => setActiveTab(tabId)}
            >
              {tabContents[tabId].title}
              {activeTab === tabId && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] -mb-[1px] bg-[#00C1C9]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-bg p-4 rounded-b-lg -mt-px">
        {activeTab !== 'faqs' && (
          <>
            <h2 className="text-xl font-semibold mb-1">{tabContents[activeTab].title}</h2>
            <p className="text-sm text-light-gray-text mb-4">{tabContents[activeTab].date}</p>
            <div className="rounded-md mb-6 py-2">
              <JoditEditor
                className="jodit-custom-theme"
                ref={editor}
                value={editableContent}
                config={joditConfig}
                onChange={(newContent) => setEditableContent(newContent)}
              />
            </div>
          </>
        )}

        {activeTab === 'faqs' && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3 border-r border-gray-700 pr-4">
              <h3 className="text-lg font-semibold mb-3">Questions</h3>
              <button
                onClick={handleAddFaq}
                className="w-full flex items-center justify-center gap-2 rounded-[4px] bg-lime-500 hover:bg-lime-400 text-white py-2 font-medium border-b-4 border-lime-600 mb-4"
              >
                <PlusIcon className="h-5 w-5" /> Add New Question
              </button>
              <ul>
                {faqs.map((faq) => (
                  <li key={faq.id} className="mb-2">
                    <button
                      className={`text-left w-full p-2 rounded-md ${
                        selectedFaq && selectedFaq.id === faq.id
                          ? 'bg-gray-700 text-white'
                          : 'text-light-gray-text hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => handleFaqSelection(faq.id)}
                    >
                      {faq.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-2/3">
              {selectedFaq ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-light-gray-text mb-1">Question:</label>
                    <input
                      type="text"
                      value={selectedFaq.question}
                      onChange={handleQuestionChange}
                      className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[#00C1C9]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-light-gray-text mb-1">Answer:</label>
                    <JoditEditor
                      className="jodit-custom-theme"
                      ref={editor}
                      value={editableContent}
                      config={joditConfig}
                      onChange={(newContent) => setEditableContent(newContent)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleDeleteFaq}
                      className="w-full flex items-center justify-center gap-2 rounded-[4px] bg-red-600 hover:bg-red-500 text-white py-2 font-medium border-b-4 border-red-700"
                    >
                      <TrashIcon className="h-5 w-5" /> Delete FAQ
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-light-gray-text">Select an FAQ to edit or add a new one.</p>
              )}
            </div>
          </div>
        )}

        <div className="col-span-full mt-4">
          <button
            type="button"
            onClick={handleSaveAndChange}
            className="w-full mx-auto flex justify-center items-center rounded-[4px] bg-cyan-400 hover:bg-cyan-300 text-white py-2 font-medium border-b-4 border-lime-400"
          >
            Save & Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
