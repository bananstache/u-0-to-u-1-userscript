// ==UserScript==
// @name         u/0/ to u/1/
// @namespace    https://lai1212.link.bio/
// @version      1.1
// @description  Always open the listed Google services using account slot 1 instead of 0
// @author       lai1212
// @match        https://mail.google.com/mail/u/0/*
// @match        https://docs.google.com/presentation/u/0/*
// @match        https://docs.google.com/document/u/0/*
// @match        https://docs.google.com/forms/u/0/*
// @match        https://docs.google.com/spreadsheets/u/0/*
// @match        https://drive.google.com/drive/u/0/*
// @match        https://www.google.com/maps*
// @match        https://classroom.google.com/
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const { origin, pathname, search, hash, host } = window.location;

  // Special-case Classroom: only the bare domain needs a redirect
  if (host === 'classroom.google.com') {
    if (!pathname.startsWith('/u/')) {
      window.location.replace(`${origin}/u/1/`);
    }
    return;                              // Nothing more to do for Classroom
  }

  // Generic rule: flip any /u/0/ (or trailing /u/0) segment to /u/1/
  const newPath = pathname
    .replace('/u/0/', '/u/1/')
    .replace(/\/u\/0$/, '/u/1');         // handles “…/u/0” without trailing slash

  if (newPath !== pathname) {
    window.location.replace(`${origin}${newPath}${search}${hash}`);

  return;
  }
   const url = location.href;

  // If already at /maps/preview and has authuser=1, do nothing
  if (url.startsWith('https://www.google.com/maps/preview') && url.includes('authuser=1')) {
    return;
  }

  // Redirect immediately
  location.href = 'https://www.google.com/maps/preview?authuser=1';
})();
