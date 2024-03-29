// install event
self.addEventListener('install', () => {
	console.log('[Service Worker] installed')
})

// activate event
self.addEventListener('activate', (e) => {
	console.log('[Service Worker] actived', e)
})

// fetch event
self.addEventListener('fetch', (e) => {
	console.log('[Service Worker] fetched resource ' + e.request.url)
})

// push alarm 
// 안 쓰이는 코드
self.addEventListener('push', function (event) {
	const data = event.data.json();
	const options = {
			body: data.body,
			icon: '/public/icons/icon-200.png', // 알림 아이콘 설정
			badge: '/public/icons/icon-200.png', // 배지 아이콘 설정
	};
	event.waitUntil(
			self.registration.showNotification(data.title, options)
	);
});