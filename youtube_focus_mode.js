// ==UserScript==
// @name         Youtube Focus Mode
// @namespace    http://seriru.net/
// @version      2024-05-12
// @description  Hide the recommendation videos and comments that appear on Youtube so that they do not disrupt your concentration.
// @author       seriru
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

// display: none is used to hide the DOM

const youtubeObserver = new MutationObserver(() => {

    const url = new URL(window.location.href);
    const path = url.pathname;

    // Nothing on the search screen
    if (path == '/results') {
        return;
    }

    if (path == '/watch') {
        // Hide related videos
        const secondaryElm = document.getElementById('secondary-inner');
        if (secondaryElm) {
            secondaryElm.style.display = 'none';
        }
        // Hide all comments
        const commentsElm = document.getElementById('comments');
        if (commentsElm) {
            commentsElm.style.display = 'none';
        }
        return;
    }

    // Hide all recommended videos on the top screen.
    if (path == '/') {
        const contents = document.getElementById('contents');
        if (contents) {
            contents.style.display = 'none';
        }
    }
});

const config = { attributes: true, childList: true, subtree: true };

(function() {
    'use strict';

    console.log('$$$$$ Youtube focus mode active.');

    const ytdAppElm = document.getElementsByTagName('ytd-app')[0];
    youtubeObserver.observe(ytdAppElm, config);
})();
