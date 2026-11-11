 const schedule = [
            { 
                id: 0, 
                title: "STUDY", 
                start: 8, 
                end: 12, 
                dur: "4 Hours",
                icon: "fa-book-open", 
                bg: "bg-blue-600",
                desc: "Primary core study block. Ideal for high-concentration topics, study tools, and core academic subjects."
            },
            { 
                id: 1, 
                title: "HOME WORK (H.W.)", 
                start: 12, 
                end: 14, 
                dur: "2 Hours",
                icon: "fa-pen-to-square", 
                bg: "bg-yellow-500",
                desc: "Complete daily assignments, revision exercises, and routine housework/tasks."
            },
            { 
                id: 2, 
                title: "STUDY", 
                start: 14, 
                end: 16, 
                dur: "2 Hours",
                icon: "fa-laptop-code", 
                bg: "bg-red-600",
                desc: "Secondary focused learning session, revision, practice problems, or practical computer work."
            },
            { 
                id: 3, 
                title: "ECO (SKILLS COURSE)", 
                start: 16, 
                end: 21, 
                dur: "5 Hours",
                icon: "fa-graduation-cap", 
                bg: "bg-emerald-600",
                desc: "Dedicated skill development course (ECO). Focus on professional skills, certifications, and project work."
            },
            { 
                id: 4, 
                title: "HOME WORK (H.W.)", 
                start: 21, 
                end: 22, 
                dur: "1 Hour",
                icon: "fa-broom", 
                bg: "bg-amber-600",
                desc: "Evening review, home organization, and preparing materials for the next day."
            },
            { 
                id: 5, 
                title: "TRADING", 
                start: 22, 
                end: 24, 
                dur: "2 Hours",
                icon: "fa-chart-line", 
                bg: "bg-orange-600",
                desc: "Market chart analysis, live trading sessions, strategy reviews, and financial journal entries."
            },
            { 
                id: 6, 
                title: "SLEEP", 
                start: 0, 
                end: 8, 
                dur: "8 Hours",
                icon: "fa-moon", 
                bg: "bg-purple-700",
                desc: "Rest and rejuvenation. Unplug from screens to ensure 8 hours of deep recovery sleep."
            }
        ];

        let currentActiveId = 0;
        let themeOverride = 'auto';

        function formatTimeStr(hr) {
            if (hr === 0 || hr === 24) return "12:00 AM";
            if (hr === 12) return "12:00 PM";
            return hr > 12 ? `${String(hr - 12).padStart(2, '0')}:00 PM` : `${String(hr).padStart(2, '0')}:00 AM`;
        }

        function renderMenuList() {
            const list = document.getElementById('fullScheduleList');
            list.innerHTML = schedule.map(s => `
                <div id="item-${s.id}" onclick="openTaskModal(${s.id})" class="p-3 rounded-2xl glass flex justify-between items-center text-xs font-bold interactive-block">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-xl ${s.bg} text-white flex items-center justify-center text-sm shadow">
                            <i class="fa-solid ${s.icon}"></i>
                        </div>
                        <div>
                            <div>${s.title}</div>
                            <div class="text-[10px] opacity-70">${formatTimeStr(s.start)} - ${formatTimeStr(s.end)}</div>
                        </div>
                    </div>
                    <span id="badge-${s.id}" class="text-[10px] px-2 py-0.5 rounded-full bg-black/10">Scheduled</span>
                </div>
            `).join('');
        }

        function openTaskModal(id) {
            const item = schedule.find(s => s.id === id);
            if (!item) return;

            document.getElementById('modalTitle').innerText = item.title;
            document.getElementById('modalTime').innerText = `${formatTimeStr(item.start)} - ${formatTimeStr(item.end)} (${item.dur})`;
            document.getElementById('modalDesc').innerText = item.desc;
            document.getElementById('modalIcon').className = `fa-solid ${item.icon}`;
            document.getElementById('modalIconBox').className = `w-16 h-16 mx-auto rounded-2xl ${item.bg} text-white flex items-center justify-center text-2xl shadow-lg mb-3`;

            const badge = document.getElementById('modalStatusBadge');
            if (id === currentActiveId) {
                badge.innerText = "● Active Now";
                badge.className = "px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 font-bold";
            } else {
                badge.innerText = "Scheduled Task";
                badge.className = "px-3 py-1 rounded-full bg-black/10 opacity-75 font-bold";
            }

            const modal = document.getElementById('taskModalBackdrop');
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
        }

        function closeTaskModal() {
            const modal = document.getElementById('taskModalBackdrop');
            modal.classList.add('opacity-0');
            setTimeout(() => modal.classList.add('hidden'), 250);
        }

        function toggleMenu(open) {
            const drawer = document.getElementById('menuDrawer');
            const backdrop = document.getElementById('menuBackdrop');
            if (open) {
                backdrop.classList.remove('hidden');
                setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
                drawer.classList.remove('translate-x-full');
            } else {
                backdrop.classList.add('opacity-0');
                drawer.classList.add('translate-x-full');
                setTimeout(() => backdrop.classList.add('hidden'), 300);
            }
        }

        function setThemeMode(mode) {
            themeOverride = mode;
            updateLoop();
        }

        function updateLoop() {
            const now = new Date();
            const hrs = now.getHours();
            const mins = now.getMinutes();

            document.getElementById('liveClock').innerText = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });

            const body = document.getElementById('bodyTheme');
            const subtitle = document.getElementById('vibeSubtitle');
            let activeVibe = themeOverride;

            if (themeOverride === 'auto') {
                if (hrs >= 6 && hrs < 12) activeVibe = 'morning';
                else if (hrs >= 12 && hrs < 17) activeVibe = 'afternoon';
                else if (hrs >= 17 && hrs < 20) activeVibe = 'evening';
                else activeVibe = 'night';
            }

            body.className = `vibe-${activeVibe} flex flex-col justify-between p-4 md:p-8 min-h-screen`;
            subtitle.innerText = `${activeVibe.charAt(0).toUpperCase() + activeVibe.slice(1)} Vibe ${activeVibe==='morning'?'🌅':activeVibe==='afternoon'?'☀️':activeVibe==='evening'?'🌆':'🌙'}`;

            let minsFrom8AM = (hrs * 60 + mins) - (8 * 60);
            if (minsFrom8AM < 0) minsFrom8AM += 1440;
            const percent24 = Math.min(Math.max((minsFrom8AM / 1440) * 100, 0), 100);
            document.getElementById('livePointer').style.left = `${percent24}%`;

            schedule.forEach(s => {
                let isActive = false;
                if (s.start < s.end) {
                    isActive = hrs >= s.start && hrs < s.end;
                } else {
                    isActive = hrs >= s.start || hrs < s.end;
                }

                const badge = document.getElementById(`badge-${s.id}`);

                if (isActive) {
                    currentActiveId = s.id;
                    document.getElementById('activeTaskName').innerText = s.title;
                    document.getElementById('activeTaskTime').innerText = `${formatTimeStr(s.start)} - ${formatTimeStr(s.end)}`;
                    document.getElementById('activeTaskIcon').className = `fa-solid ${s.icon}`;
                    document.getElementById('activeTaskIconBox').className = `w-20 h-20 mx-auto rounded-3xl ${s.bg} text-white flex items-center justify-center text-3xl shadow-xl mb-4 transition-all`;

                    let startMinsFrom8 = (s.start * 60) - (8 * 60);
                    if (startMinsFrom8 < 0) startMinsFrom8 += 1440;
                    let durMins = (s.end > s.start ? (s.end - s.start) : (24 - s.start + s.end)) * 60;
                    let elapsed = minsFrom8AM - startMinsFrom8;
                    let prog = Math.min(Math.max(Math.round((elapsed / durMins) * 100), 0), 100);

                    document.getElementById('activeTaskPercent').innerText = `${prog}%`;
                    document.getElementById('activeTaskProgress').style.width = `${prog}%`;

                    if (badge) {
                        badge.innerText = "Active";
                        badge.className = "text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold";
                    }
                } else {
                    if (badge) {
                        badge.innerText = "Scheduled";
                        badge.className = "text-[10px] px-2 py-0.5 rounded-full bg-black/10";
                    }
                }
            });
        }

        // Disable text copying, right clicks & drag actions
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('dragstart', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && ['c', 'C', 'u', 'U', 's', 'S', 'a', 'A', 'p', 'P'].includes(e.key)) {
                e.preventDefault();
            }
        });


        // ---------------- PWA ----------------
        let deferredInstallPrompt = null;

        function isStandalone() {
            return window.matchMedia('(display-mode: standalone)').matches ||
                   window.navigator.standalone === true ||
                   document.referrer.startsWith('android-app://');
        }

        function updateInstallUI() {
            const headerBtn = document.getElementById('installAppBtn');
            const menuBtn = document.getElementById('menuInstallBtn');
            const card = document.getElementById('pwaInstallCard');
            const text = document.getElementById('pwaInstallText');

            if (isStandalone()) {
                if (headerBtn) headerBtn.classList.add('hidden');
                if (card) card.classList.add('hidden');
                return;
            }

            if (deferredInstallPrompt) {
                if (headerBtn) headerBtn.classList.remove('hidden');
                if (menuBtn) menuBtn.classList.remove('hidden');
                if (text) text.innerText = 'Install this app on your device.';
            } else {
                if (headerBtn) headerBtn.classList.add('hidden');
                if (menuBtn) menuBtn.classList.add('hidden');
                if (text) text.innerText = 'Use your browser menu to add it to the home screen.';
            }
        }

        window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault();
            deferredInstallPrompt = event;
            updateInstallUI();
        });

        window.addEventListener('appinstalled', () => {
            deferredInstallPrompt = null;
            updateInstallUI();
        });

        async function installPWA() {
            if (!deferredInstallPrompt) {
                alert('To install My Routine, open the browser menu and choose "Add to Home screen" or "Install app".');
                return;
            }

            deferredInstallPrompt.prompt();
            const result = await deferredInstallPrompt.userChoice;
            if (result.outcome === 'accepted') {
                deferredInstallPrompt = null;
            }
            updateInstallUI();
        }

        // Register service worker on HTTPS or localhost.
        if ('serviceWorker' in navigator &&
            (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
            window.addEventListener('load', async () => {
                try {
                    const registration = await navigator.serviceWorker.register('./sw.js', { scope: './' });
                    registration.addEventListener('updatefound', () => {
                        const worker = registration.installing;
                        if (!worker) return;
                        worker.addEventListener('statechange', () => {
                            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('A new My Routine version is available.');
                            }
                        });
                    });
                } catch (err) {
                    console.warn('Service worker registration failed:', err);
                }
            });
        }

        updateInstallUI();

        renderMenuList();
        updateLoop();
        setInterval(updateLoop, 1000);