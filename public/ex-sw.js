importScripts("https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js"),importScripts("https://www.gstatic.com/firebasejs/7.13.2/firebase-messaging.js"),firebase.initializeApp({apiKey:"AIzaSyC_QlMMTQ2Q2nKgp0ey5pYvNXvW1fN2Czk",authDomain:"exs-dm.firebaseapp.com",databaseURL:"https://exs-dm.firebaseio.com",projectId:"exs-dm",storageBucket:"exs-dm.appspot.com",messagingSenderId:"681634276054",appId:"1:681634276054:web:df31b0afe8d88f03a11f77",measurementId:"G-5GHGR6KK07"});const messaging=firebase.messaging();var _userAgent=navigator.userAgent,is_Chrome=_userAgent.indexOf("Chrome"),is_ChromeMobile=_userAgent.indexOf("CriOS"),is_SamsungBrowser=_userAgent.indexOf("SamsungBrowser"),is_Windows=_userAgent.indexOf("Windows NT"),is_Mac=_userAgent.indexOf("Macintosh"),is_Edge=_userAgent.indexOf("Edge"),is_IE=_userAgent.indexOf("Trident");self.addEventListener("notificationclick",function(e){var i=e.notification.data.click_action||e.notification.click_action;e.notification.close(),e.waitUntil(clients.matchAll({includeUncontrolled:!0,type:"window"}).then(function(e){for(var s=0;s<e.length;s++){var n=e[s];if(n.url==i&&"focus"in n)return n.focus()}if(clients.openWindow)return clients.openWindow(i)}))});const showMessage=function(e){var i=e.data.body,s=e.data.icon,n=e.data.image,t=e.fcmOptions.link;is_Mac>-1&&(s=n,n="");var a=e.data.title,o={body:i,icon:s,image:n,data:{click_action:t}};return self.registration.showNotification(a,o)};messaging.setBackgroundMessageHandler(showMessage),self.addEventListener("message",function(e){if(e.data == "skipWaiting") {self.skipWaiting()} else {showMessage(e.data)}}),self.addEventListener("install",function(e){self.skipWaiting()});