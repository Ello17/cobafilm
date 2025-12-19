(function(){
	// Data: simpan link src di sini. Support untuk entries single atau series dengan episodes[].
	const videos = [
		{
			id: 1,
			title: 'Sore Istri Dari Masa Depan (2025)',
			src: 'https://vod3.cf.dmcdn.net/sec2(87FIrGMTJcFkEaYZShi7JJ5AAEf7olEoMLM0mVhjfh1vy888V1IwhxXZU0ZAnjBQ4oO0imk2fRY2so1V29OBiur7zq9LaRCFbWsMl7xvxx8nVe3NVUvUq7ivcW9bINKvLx7qLygd8BWnrMUdJZrdD7nfgJwvntPKlNEqZPtynmDK7VNo58sNN3FI9xCgxK-F)/video/fmp4/595115066/h264_aac_hd/1/manifest.m3u8',
			thumbnail: 'https://cdn.teater.co/imgs/review-sore-istri-dari-masa-depan-2025_890_490.webp'
		},
		{
			id: 2,
			title: 'Serial Contoh: Kisah Kota',
			thumbnail: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=320&q=60',
			episodes: [
				{ title: 'Episode 1 - Awal', src: 'https://cdn.coverr.co/videos/coverr-surf-waves-1636/1080p.mp4' },
				{ title: 'Episode 2 - Konflik', src: 'https://cdn.coverr.co/videos/coverr-a-sunset-on-the-pier-1580/1080p.mp4' },
				{ title: 'Episode 3 - Penyelesaian', src: 'https://cdn.coverr.co/videos/coverr-milky-way-and-rocky-coast-1651/1080p.mp4' }
			]
		},
		{
			id: 3,
			title: 'GANJIL GENAP (2023)',
			src: 'https://vod3.cf.dmcdn.net/sec2(B6wqIYIWXy8ukWMI2xUSpz5hiBxuXdHBYAQlvyq6KvyqKiCHfnT6EkF7TuSFsVvbJdtjkYvu3XFsj5O75w-b8yHkQmc8T2TxhnTythJ2BPCwiP3Zof2nP3fc6aN3H-tBIEae7wi8_o0OraSbRFRJdF_1mNNJYs8IVtXDy7I0NEqvIVxwZAQCp-aGhNAN3EZ6)/video/072/994/557499270_mp4_h264_aac_fhd_2.m3u8',
			thumbnail: 'https://m.media-amazon.com/images/M/MV5BZTFiZTU5OTQtNTQ4My00MjVhLTkzZWQtMjY5YWY0NzlkZGE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
		},
		{
			id: 4,
			title: 'Start Up Never Give Up (2024)',
			src: 'https://vod3.cf.dmcdn.net/sec2(M-mlfIlVH3Z3YPf85uFLwUqHcgRjq2xRN6ses6-NyRGGGfqrOqgOLFcAsFlU0VXtHOWbGPUf_dfe9kwg3mDdXfuOLuRW0koYfDAhZBJIUYu9dGK4TkKDeB3lmwx50hdaID4yaPBBpFtb8DXQE1rfcKJHjECCIaTNW-D3cNeFVbJvCwT8Ud-yrL1rK6azfnBc)/video/099/874/570478990_mp4_h264_aac_hd_2.m3u8',
			thumbnail: 'https://th.bing.com/th/id/R.38bcff02308d4fb90131f2e542a0ce73?rik=ik6iFcbcirNIHw&riu=http%3a%2f%2fimg.youtube.com%2fvi%2f_jAqhTpOz_8%2fmaxresdefault.jpg&ehk=00rwPEf5Qwro578PqO1zugmCOgrw3aa%2f2pQn7I68ssY%3d&risl=&pid=ImgRaw&r=0'
		},
		{
			id: 5,
			title: 'Uang Panai 2 (2024)',
			src: 'https://vod3.cf.dmcdn.net/sec2(rkv-WEs6tTbqpgea0h7lJ4BTgRcnj_8PiZ1pI2oBANren-gAqtLEdMaxvi0KiCejlZbPIxvJVVgXlsCw68fzY6rTRYY-Pv3hkBdHi6ZZ90cqT-c5ST2yG3YNf4UeFcp3nkXfWcoKBbxNJcF3KL0_O4xGmvwYvZ2wEvuWCBi1ntJrgF-poIXldoSSqoXrjs8e)/video/055/297/567792550_mp4_h264_aac_hd_2.m3u8',
			thumbnail: 'https://i.ytimg.com/vi/wfR2Fi20at8/maxresdefault.jpg'
		}
	];

	const player = document.getElementById('player');
	const playlistEl = document.getElementById('playlist');
	const titleEl = document.getElementById('video-title');
	const searchEl = document.getElementById('search');

	// currentState: { type: 'single'|'series', index: number, episode: number|null }
	let currentState = { type: null, index: -1, episode: null };

	function createListItem(video, index){
		const li = document.createElement('li');
		li.className = video.episodes ? 'series' : 'single';
		li.dataset.index = index;

		const img = document.createElement('img');
		img.className = 'thumb';
		img.src = video.thumbnail || '';
		img.alt = video.title;

		const meta = document.createElement('div');
		meta.className = 'meta';
		const t = document.createElement('div');
		t.className = 'title';
		t.textContent = video.title;
		meta.appendChild(t);

		if(video.episodes){
			const badge = document.createElement('div');
			badge.className = 'episode-badge';
			badge.textContent = video.episodes.length + ' episode';
			meta.appendChild(badge);
		}

		li.appendChild(img);
		li.appendChild(meta);

		// click: for series -> play episode 1 + show episodes strip; for single -> play
		li.addEventListener('click', (e)=>{
			if(video.episodes){
				// play first episode (index 0)
				loadEpisode(index, 0);
			} else {
				loadSingle(index);
			}
		});

		return li;
	}

	function renderPlaylist(listWithIndex){
		// listWithIndex: array of {video, index}
		playlistEl.innerHTML = '';
		listWithIndex.forEach(({video, index})=>{
			playlistEl.appendChild(createListItem(video,index));
		});
		updateActiveMarkers();
	}

	function updateActiveMarkers(){
		// clear markers
		playlistEl.querySelectorAll('li').forEach(el=> el.classList.remove('active'));
		document.querySelectorAll('.episode-card').forEach(el=> el.classList.remove('active'));
		if(currentState.type === 'single'){
			const sel = playlistEl.querySelector('li[data-index="' + currentState.index + '"]');
			if(sel) sel.classList.add('active');
		} else if(currentState.type === 'series'){
			const series = playlistEl.querySelector('li[data-index="' + currentState.index + '"]');
			if(series) series.classList.add('active');
			const ep = document.querySelector('.episode-card[data-series="' + currentState.index + '"][data-episode="' + currentState.episode + '"]');
			if(ep) ep.classList.add('active');
		}
	}

	// render episode strip under the player for a series index
	const episodeStripEl = document.getElementById('episode-strip');
	function showEpisodeStrip(seriesIndex){
		const series = videos[seriesIndex];
		if(!series || !series.episodes) return;
		renderEpisodeStrip(series, seriesIndex);
		episodeStripEl.setAttribute('aria-hidden','false');
	}

	function hideEpisodeStrip(){
		episodeStripEl.innerHTML = '';
		episodeStripEl.setAttribute('aria-hidden','true');
	}

	function renderEpisodeStrip(series, seriesIndex){
		episodeStripEl.innerHTML = '';
		series.episodes.forEach((ep, ei)=>{
			const card = document.createElement('div');
			card.className = 'episode-card';
			card.dataset.series = seriesIndex;
			card.dataset.episode = ei;

			const img = document.createElement('img');
			img.className = 'ep-thumb';
			img.src = series.thumbnail || '';
			img.alt = ep.title;

			const meta = document.createElement('div');
			meta.className = 'ep-meta';
			const t = document.createElement('div');
			t.className = 'ep-title';
			t.textContent = ep.title;
			meta.appendChild(t);

			card.appendChild(img);
			card.appendChild(meta);

			card.addEventListener('click', ()=> loadEpisode(seriesIndex, ei));
			episodeStripEl.appendChild(card);
		});
		updateActiveMarkers();
	}

	function playVideo(src, title){
		player.pause();
		// set src attribute (use src for direct mp4/hls depending on browser)
		player.src = src;
		player.load();
		player.play().catch(()=>{});
		titleEl.textContent = title;
	}

	function loadSingle(index){
		const video = videos[index];
		if(!video) return;
		playVideo(video.src, video.title);
		currentState = { type: 'single', index: index, episode: null };
		// hide episode strip when playing a single item
		hideEpisodeStrip();
		updateActiveMarkers();
	}

	function loadEpisode(seriesIndex, episodeIndex){
		const series = videos[seriesIndex];
		if(!series || !series.episodes) return;
		const ep = series.episodes[episodeIndex];
		if(!ep) return;
		playVideo(ep.src, series.title + ' — ' + ep.title);
		currentState = { type: 'series', index: seriesIndex, episode: episodeIndex };
		// ensure episode strip is visible and highlight
		showEpisodeStrip(seriesIndex);
		updateActiveMarkers();
	}

	// autoplay next: if in series -> next episode, else next item
	player.addEventListener('ended', ()=>{
		if(currentState.type === 'series'){
			const s = videos[currentState.index];
			const nextEp = currentState.episode + 1;
			if(nextEp < s.episodes.length){
				loadEpisode(currentState.index, nextEp);
				return;
			}
			// otherwise fallthrough to next item after series
		}
		// find next item index
		let nextIndex = currentState.index + 1;
		if(nextIndex >= videos.length) nextIndex = 0;
		const nextItem = videos[nextIndex];
		if(nextItem.episodes){
			// play first episode of next series
			loadEpisode(nextIndex, 0);
		} else {
			loadSingle(nextIndex);
		}
	});

	// search filter: match series title or episode titles or single titles
	searchEl.addEventListener('input', (e)=>{
		const q = e.target.value.toLowerCase().trim();
		const mapped = videos.map((video, i)=>({ video, index: i }));
		const filtered = mapped.filter(({video})=>{
			if(video.episodes){
				if(video.title.toLowerCase().includes(q)) return true;
				return video.episodes.some(ep=>ep.title.toLowerCase().includes(q));
			}
			return (video.title || '').toLowerCase().includes(q);
		});
		renderPlaylist(filtered);
	});

	// initial render using mapping to preserve original indices
	renderPlaylist(videos.map((v,i)=>({video:v,index:i})));

	// load first item: if series -> first episode
	if(videos.length){
		if(videos[0].episodes) loadEpisode(0,0); else loadSingle(0);
	}

})();


//Security Script

// Nonaktifkan klik kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Blokir shortcut keyboard
document.addEventListener('keydown', function(e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && [73,74,75].includes(e.keyCode)) ||
        (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
});

// Debugger setiap 1 detik
setInterval(function() {
    debugger;
}, 1000);