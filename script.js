//Système de gestion des données
class DataManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('romanscript-users')) || [];
        this.works = JSON.parse(localStorage.getItem('romanscript-works')) || this.getInitialWorks();
        this.currentUser = JSON.parse(localStorage.getItem('romanscript-current-user')) || null;
        this.saveData();
    }

    getInitialWorks() {
        return [
            {
                id: '1',
                title: "L'Encre du Destin",
                synopsis: "Dans les couloirs d'une bibliothèque ancestrale, une jeune archiviste découvre des manuscrits qui prédisent l'avenir. Entre mystère et romance, elle doit choisir entre révéler la vérité ou préserver le secret des mots qui façonnent le monde.",
                genre: "Fantastique Romantique",
                category: "films",
                authorId: "demo1",
                authorName: "Alex Moreau",
                authorPenName: "A. Moreau",
                image: "https://images.unsplash.com/photo-1505682499293-233fb141754c",
                publishDate: new Date().toISOString(),
                pdfName: "encre_du_destin.pdf"
            },
            {
                id: '2',
                title: "Mémoires Perdues",
                synopsis: "Un écrivain amnésique retrouve des fragments de romans qu'il aurait écrits, mais qui racontent des événements réels qu'il n'a jamais vécus. Une quête introspective sur l'identité et le pouvoir de la création littéraire.",
                genre: "Drame Psychologique",
                category: "films",
                authorId: "demo2",
                authorName: "Sophie Martin",
                authorPenName: "S. Martin",
                image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
                publishDate: new Date().toISOString(),
                pdfName: "memoires_perdues.pdf"
            },
            {
                id: '3',
                title: "La Maison des Écrivains",
                synopsis: "Dans une résidence d'artistes, cinq écrivains de genres différents vivent sous le même toit. Entre rivalités créatives, amitiés inattendues et projets collaboratifs, chaque épisode explore leur univers littéraire unique et leurs défis personnels.",
                genre: "Comédie Dramatique",
                category: "series",
                authorId: "demo1",
                authorName: "Alex Moreau",
                authorPenName: "A. Moreau",
                image: "https://images.pexels.com/photos/7967591/pexels-photo-7967591.jpeg",
                publishDate: new Date().toISOString(),
                pdfName: "maison_ecrivains.pdf"
            },
            {
                id: '4',
                title: "Les Secrets de Paris",
                synopsis: "Un roman captivant qui explore les mystères cachés de la capitale française à travers les yeux d'une journaliste curieuse. Dans les rues pavées de Montmartre aux couloirs du Louvre, elle découvre des indices qui la mènent vers une vérité bouleversante.",
                genre: "Mystère Urbain",
                category: "romans",
                authorId: "demo3",
                authorName: "Marie Dubois",
                authorPenName: "M. Dubois",
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
                publishDate: new Date().toISOString(),
                pdfName: "secrets_paris.pdf"
            }
        ];
    }

    saveData() {
        localStorage.setItem('romanscript-users', JSON.stringify(this.users));
        localStorage.setItem('romanscript-works', JSON.stringify(this.works));
        localStorage.setItem('romanscript-current-user', JSON.stringify(this.currentUser));
    }

    register(userData) {
        const newUser = {
            id: 'user_' + Date.now(),
            ...userData,
            joinDate: new Date().toISOString()
        };
        this.users.push(newUser);
        this.currentUser = newUser;
        this.saveData();
        return newUser;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            this.saveData();
            return user;
        }
        return null;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('romanscript-current-user');
    }

    addWork(workData) {
        const newWork = {
            id: 'work_' + Date.now(),
            ...workData,
            authorId: this.currentUser.id,
            authorName: this.currentUser.name,
            authorPenName: this.currentUser.penName,
            publishDate: new Date().toISOString()
        };
        this.works.push(newWork);
        this.saveData();
        return newWork;
    }

    getWorksByCategory(category) {
        return this.works.filter(work => work.category === category);
    }

    getWorksByAuthor(authorId) {
        return this.works.filter(work => work.authorId === authorId);
    }

    getStats() {
        return {
            totalWorks: this.works.length,
            totalWriters: new Set(this.works.map(w => w.authorId)).size,
            filmCount: this.works.filter(w => w.category === 'films').length,
            seriesCount: this.works.filter(w => w.category === 'series').length,
            documentairesCount: this.works.filter(w => w.category === 'documentaires').length,
            romansCount: this.works.filter(w => w.category === 'romans').length
        };
    }
}

// Instance globale du gestionnaire de données
const dataManager = new DataManager();

// Fonctions de navigation
function showHome() {
    hideAllPages();
    document.getElementById('home-page').style.display = 'block';
    updateNavigation('home');
    updateStats();
}

function showCategory(category) {
    hideAllPages();
    document.getElementById(category + '-page').style.display = 'block';
    updateNavigation(category);
    loadCategoryWorks(category);
}

function hideAllPages() {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const sections = ['home', 'films', 'series', 'documentaires', 'romans'];
    const index = sections.indexOf(activeSection);
    if (index !== -1 && navLinks[index]) {
        navLinks[index].classList.add('active');
    }
}

// Fonctions d'authentification
function showLogin() {
    closeAllModals();
    document.getElementById('login-modal').style.display = 'flex';
}

function showRegister() {
    closeAllModals();
    document.getElementById('register-modal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
}

function logout() {
    dataManager.logout();
    updateAuthUI();
    showHome();
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const uploadButtons = document.querySelectorAll('.upload-button');
    
    if (dataManager.currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        document.getElementById('user-name').textContent = dataManager.currentUser.penName;
        uploadButtons.forEach(btn => btn.style.display = 'inline-block');
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
        uploadButtons.forEach(btn => btn.style.display = 'none');
    }
}

// Gestion des formulaires
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = dataManager.login(email, password);
    if (user) {
        closeModal('login-modal');
        updateAuthUI();
        alert('Connexion réussie ! Bienvenue ' + user.penName);
    } else {
        alert('Email ou mot de passe incorrect');
    }
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const userData = {
        name: document.getElementById('register-name').value,
        penName: document.getElementById('register-pen-name').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
        bio: document.getElementById('register-bio').value
    };
    
    // Vérifier si l'email existe déjà
    if (dataManager.users.find(u => u.email === userData.email)) {
        alert('Cet email est déjà utilisé');
        return;
    }
    
    const user = dataManager.register(userData);
    closeModal('register-modal');
    updateAuthUI();
    alert('Inscription réussie ! Bienvenue ' + user.penName);
});

// Gestion de l'upload
function showUploadModal(category) {
    if (!dataManager.currentUser) {
        alert('Veuillez vous connecter pour publier une œuvre');
        showLogin();
        return;
    }
    
    const titles = {
        films: 'Publier un scénario de film',
        series: 'Publier une série',
        documentaires: 'Publier un documentaire',
        romans: 'Publier un roman'
    };
    
    document.getElementById('upload-title').textContent = titles[category];
    document.getElementById('work-category').value = category;
    document.getElementById('upload-modal').style.display = 'flex';
}

document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const workData = {
        title: document.getElementById('work-title').value,
        genre: document.getElementById('work-genre').value,
        synopsis: document.getElementById('work-synopsis').value,
        category: document.getElementById('work-category').value,
        image: document.getElementById('work-image').value || 'https://images.unsplash.com/photo-1505682499293-233fb141754c',
        pdfName: 'uploaded_' + Date.now() + '.pdf'
    };
    
    // Simulation de l'upload du PDF
    const pdfFile = document.getElementById('work-pdf').files[0];
    if (pdfFile) {
        console.log('PDF uploadé:', pdfFile.name);
    }
    
    const newWork = dataManager.addWork(workData);
    closeModal('upload-modal');
    document.getElementById('upload-form').reset();
    
    alert('Œuvre publiée avec succès !');
    showCategory(workData.category);
});

// Chargement des œuvres par catégorie
function loadCategoryWorks(category) {
    const works = dataManager.getWorksByCategory(category);
    const container = document.getElementById(category + '-works');
    
    container.innerHTML = works.map(work => `
        <div class="work-card" onclick="showWorkDetail('${work.id}')">
            <div class="work-image">
                <img src="${work.image}" alt="${work.title}">
                <div class="work-overlay">
                    <button class="read-button">📖 Voir détails</button>
                </div>
            </div>
            <div class="work-info">
                <h3 class="work-title">${work.title}</h3>
                <div class="work-meta">
                    <span class="work-author">Par ${work.authorPenName}</span>
                    <span class="work-genre">${work.genre}</span>
                </div>
                <p class="work-synopsis">${work.synopsis}</p>
                <div class="work-stats">
                    <span class="publish-date">${new Date(work.publishDate).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Affichage des détails d'une œuvre
function showWorkDetail(workId) {
    const work = dataManager.works.find(w => w.id === workId);
    if (!work) return;
    
    const content = `
        <div class="work-detail-header">
            <h1 class="work-detail-title">${work.title}</h1>
            <div class="work-detail-meta">
                <span class="badge genre-badge">${work.genre}</span>
                <span class="badge category-badge">${getCategoryName(work.category)}</span>
            </div>
        </div>
        <div class="work-detail-body">
            <div class="work-detail-image">
                <img src="${work.image}" alt="${work.title}">
            </div>
            <div class="work-detail-info">
                <div class="author-info-card" onclick="showAuthorProfile('${work.authorId}')">
                    <h3>📝 Écrit par</h3>
                    <h4>${work.authorPenName}</h4>
                    <p>Voir le profil de l'auteur →</p>
                </div>
                <div class="synopsis-section">
                    <h3>Synopsis</h3>
                    <p>${work.synopsis}</p>
                </div>
                <div class="download-section">
                    <h3>Télécharger</h3>
                    <button class="download-button" onclick="downloadPDF('${work.pdfName}', '${work.title}', '${work.synopsis.replace(/'/g, "\\'")}', '${work.authorPenName}', '${work.genre}')">
                        📄 Télécharger le PDF
                    </button>
                    <small>Publié le ${new Date(work.publishDate).toLocaleDateString()}</small>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('work-detail-content').innerHTML = content;
    document.getElementById('work-modal').style.display = 'flex';
}

function getCategoryName(category) {
    const names = {
        films: 'Film',
        series: 'Série',
        documentaires: 'Documentaire',
        romans: 'Roman'
    };
    return names[category] || category;
}

// FONCTION PDF CORRIGÉE - TÉLÉCHARGEMENT RÉEL !
function downloadPDF(filename, workTitle, synopsis, authorName, genre) {
    // Vérifier si jsPDF est disponible
    if (typeof window.jspdf === 'undefined') {
        // Méthode alternative sans bibliothèque
        generateSimplePDF(filename, workTitle, synopsis, authorName, genre);
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuration
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let yPosition = 30;
    
    // En-tête
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(workTitle, margin, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Par ${authorName} • ${genre}`, margin, yPosition);
    
    yPosition += 20;
    
    // Synopsis
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Synopsis", margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    const splitSynopsis = doc.splitTextToSize(synopsis, pageWidth - 2 * margin);
    doc.text(splitSynopsis, margin, yPosition);
    
    yPosition += splitSynopsis.length * lineHeight + 20;
    
    // Contenu du scénario/roman
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Extrait", margin, yPosition);
    
    yPosition += 15;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    // Contenu selon la catégorie
    let content = '';
    if (workTitle.includes('Encre')) {
        content = `FADE IN:

INT. BIBLIOTHÈQUE ANCESTRALE - JOUR

MARIE (25 ans), archiviste passionnée, fouille dans les rayons poussiéreux. Ses doigts effleurent un manuscrit ancien.

MARIE
(murmurant)
Qu'est-ce que c'est que ça ?

Elle ouvre le manuscrit. Les pages semblent briller d'une lueur étrange.

MARIE (CONT'D)
"Les événements à venir..." 

Elle lit la première ligne et écarquille les yeux. Le texte décrit précisément ce qu'elle vient de faire.

FADE OUT.`;
    } else if (workTitle.includes('Mémoires')) {
        content = `INT. APPARTEMENT DE DAVID - NUIT

DAVID (40 ans), écrivain troublé, se réveille en sursaut. Sur son bureau, des pages manuscrites qu'il ne se souvient pas d'avoir écrites.

DAVID
(se parlant à lui-même)
Qu'est-ce que j'ai encore écrit ?

Il lit les premières lignes : "Le jour où j'ai perdu la mémoire, j'ai découvert qui j'étais vraiment."

Un frisson lui parcourt l'échine.

DAVID (CONT'D)
Mais... c'est impossible.

Il continue de lire, découvrant des détails de sa vie qu'il avait oubliés.`;
    } else {
        content = `Cette œuvre explore les thèmes profonds de la condition humaine à travers une narration captivante.

Les personnages évoluent dans un univers riche et complexe, où chaque dialogue révèle une facette nouvelle de leur personnalité.

L'intrigue se déroule de manière fluide, alternant entre moments de tension et instants de réflexion philosophique.

Cette histoire vous transportera dans un monde où fiction et réalité se mélangent subtilement.`;
    }
    
    const splitContent = doc.splitTextToSize(content, pageWidth - 2 * margin);
    doc.text(splitContent, margin, yPosition);
    
    // Pied de page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.text(`RomanScript • ${workTitle} • Page ${i}`, margin, doc.internal.pageSize.getHeight() - 10);
    }
    
    // Télécharger le PDF
    doc.save(filename);
    
    console.log(`PDF généré et téléchargé: ${filename}`);
}

// Fonction alternative sans bibliothèque
function generateSimplePDF(filename, workTitle, synopsis, authorName, genre) {
    // Créer un document texte simple
    const content = `${workTitle}
Par ${authorName} • ${genre}

SYNOPSIS:
${synopsis}

CONTENU:
Cette œuvre est disponible en version complète sur RomanScript.

---
Téléchargé depuis RomanScript
${new Date().toLocaleDateString()}`;
    
    // Créer un blob et télécharger
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.pdf', '.txt');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
    
    console.log(`Fichier texte téléchargé: ${filename}`);
}

// Profils d'auteurs
function showAuthorProfile(authorId) {
    const authorWorks = dataManager.getWorksByAuthor(authorId);
    if (authorWorks.length === 0) return;
    
    const author = authorWorks[0];
    closeModal('work-modal');
    
    hideAllPages();
    document.getElementById('profile-page').style.display = 'block';
    
    const profileInfo = document.getElementById('profile-info');
    const profileWorks = document.getElementById('profile-works');
    
    profileInfo.innerHTML = `
        <div class="profile-card">
            <h2>${author.authorPenName}</h2>
            <p class="real-name">${author.authorName}</p>
            <div class="profile-stats">
                <div class="stat">
                    <span class="stat-number">${authorWorks.length}</span>
                    <span class="stat-label">Œuvres publiées</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${new Set(authorWorks.map(w => w.category)).size}</span>
                    <span class="stat-label">Catégories</span>
                </div>
            </div>
        </div>
    `;
    
    profileWorks.innerHTML = `
        <h3>Œuvres publiées</h3>
        <div class="profile-works-grid">
            ${authorWorks.map(work => `
                <div class="profile-work-card" onclick="showWorkDetail('${work.id}')">
                    <img src="${work.image}" alt="${work.title}">
                    <div class="profile-work-info">
                        <h4>${work.title}</h4>
                        <p>${getCategoryName(work.category)} • ${work.genre}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showProfile() {
    if (!dataManager.currentUser) return;
    showAuthorProfile(dataManager.currentUser.id);
}

// Mise à jour des statistiques
function updateStats() {
    const stats = dataManager.getStats();
    
    document.getElementById('total-works').textContent = stats.totalWorks;
    document.getElementById('total-writers').textContent = stats.totalWriters;
    document.getElementById('films-count').textContent = stats.filmCount;
    document.getElementById('series-count').textContent = stats.seriesCount;
    document.getElementById('documentaires-count').textContent = stats.documentairesCount;
    document.getElementById('romans-count').textContent = stats.romansCount;
}

// Gestion des clics sur les modals
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    showHome();
});