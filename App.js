import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);

  // Content structure - Easy to modify later
  const screenplays = {
    films: [
      {
        id: 1,
        title: "L'Encre du Destin",
        synopsis: "Dans les couloirs d'une bibliothèque ancestrale, une jeune archiviste découvre des manuscrits qui prédisent l'avenir. Entre mystère et romance, elle doit choisir entre révéler la vérité ou préserver le secret des mots qui façonnent le monde.",
        year: 2024,
        genre: "Fantastique Romantique",
        image: "https://images.unsplash.com/photo-1505682499293-233fb141754c",
        episodes: [
          { title: "Scénario Principal", filename: "encre_du_destin.pdf" }
        ]
      },
      {
        id: 2,
        title: "Mémoires Perdues",
        synopsis: "Un écrivain amnésique retrouve des fragments de romans qu'il aurait écrits, mais qui racontent des événements réels qu'il n'a jamais vécus. Une quête introspective sur l'identité et le pouvoir de la création littéraire.",
        year: 2024,
        genre: "Drame Psychologique",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
        episodes: [
          { title: "Scénario Principal", filename: "memoires_perdues.pdf" }
        ]
      }
    ],
    series: [
      {
        id: 3,
        title: "La Maison des Écrivains",
        synopsis: "Dans une résidence d'artistes, cinq écrivains de genres différents vivent sous le même toit. Entre rivalités créatives, amitiés inattendues et projets collaboratifs, chaque épisode explore leur univers littéraire unique et leurs défis personnels.",
        year: 2024,
        genre: "Comédie Dramatique",
        image: "https://images.pexels.com/photos/7967591/pexels-photo-7967591.jpeg",
        episodes: [
          { title: "Épisode 1: Nouveaux Résidents", filename: "maison_ecrivains_ep1.pdf" },
          { title: "Épisode 2: Syndrome de la Page Blanche", filename: "maison_ecrivains_ep2.pdf" },
          { title: "Épisode 3: Concours Littéraire", filename: "maison_ecrivains_ep3.pdf" },
          { title: "Épisode 4: L'Inspiration Collective", filename: "maison_ecrivains_ep4.pdf" },
          { title: "Épisode 5: Publication", filename: "maison_ecrivains_ep5.pdf" }
        ]
      },
      {
        id: 4,
        title: "Chasseurs de Manuscrits",
        synopsis: "Une équipe de chasseurs de trésors littéraires parcourt le monde à la recherche d'œuvres perdues d'auteurs célèbres. Adventure, mystère et passion pour la littérature s'entremêlent dans cette série captivante.",
        year: 2024,
        genre: "Aventure Littéraire",
        image: "https://images.unsplash.com/photo-1505682499293-233fb141754c",
        episodes: [
          { title: "Épisode 1: Le Manuscrit de Molière", filename: "chasseurs_ep1.pdf" },
          { title: "Épisode 2: Les Lettres de George Sand", filename: "chasseurs_ep2.pdf" },
          { title: "Épisode 3: L'Œuvre Secrète de Dumas", filename: "chasseurs_ep3.pdf" },
          { title: "Épisode 4: Le Journal de Baudelaire", filename: "chasseurs_ep4.pdf" }
        ]
      }
    ],
    documentaires: [
      {
        id: 5,
        title: "L'Art de l'Écriture",
        synopsis: "Une exploration fascinante du processus créatif des grands écrivains contemporains. De l'inspiration à la publication, découvrez les secrets, rituels et méthodes de travail des maîtres de la littérature moderne.",
        year: 2024,
        genre: "Documentaire Culturel",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
        episodes: [
          { title: "Épisode 1: Les Rituels d'Écriture", filename: "art_ecriture_ep1.pdf" },
          { title: "Épisode 2: Inspiration et Blocages", filename: "art_ecriture_ep2.pdf" },
          { title: "Épisode 3: De l'Idée au Livre", filename: "art_ecriture_ep3.pdf" }
        ]
      },
      {
        id: 6,
        title: "Bibliothèques du Monde",
        synopsis: "Un voyage à travers les plus belles bibliothèques du monde, leurs histoires et les trésors qu'elles renferment. Chaque épisode révèle l'âme de ces temples du savoir et les gardiens qui les préservent.",
        year: 2024,
        genre: "Documentaire Voyage",
        image: "https://images.pexels.com/photos/7967591/pexels-photo-7967591.jpeg",
        episodes: [
          { title: "Épisode 1: Trinity College Dublin", filename: "bibliotheques_ep1.pdf" },
          { title: "Épisode 2: Bibliothèque Sainte-Geneviève", filename: "bibliotheques_ep2.pdf" },
          { title: "Épisode 3: New York Public Library", filename: "bibliotheques_ep3.pdf" }
        ]
      }
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentView('category');
    setSelectedWork(null);
  };

  const handleWorkClick = (work) => {
    setSelectedWork(work);
    setCurrentView('work');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedWork(null);
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
    setSelectedWork(null);
  };

  const handleDownloadPDF = (filename) => {
    // For now, show an alert. Later this will download from /pdfs/ folder
    alert(`Téléchargement de ${filename}\n\nPour ajouter vos PDFs :\n1. Créez un dossier 'pdfs' dans votre projet\n2. Ajoutez vos fichiers PDF\n3. Le téléchargement fonctionnera automatiquement !`);
  };

  const renderHome = () => (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">RomanScript</h1>
          <p className="hero-subtitle">
            Pour les passionnés d'écriture et de lecture
          </p>
          <div className="author-info">
            <h3>Alex Moreau</h3>
            <p>Scénariste & Conteur</p>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1505682499293-233fb141754c" alt="Écriture créative" />
          <div className="hero-overlay">
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">12+</span>
                <span className="stat-label">Projets</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Catégories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <h2 className="section-title">Explorez nos Créations</h2>
        <p className="section-subtitle">Découvrez des histoires captivantes dans chaque catégorie</p>
        
        <div className="categories-grid">
          <div className="category-card" onClick={() => handleCategoryClick('films')}>
            <div className="category-icon">🎬</div>
            <h3>Films</h3>
            <p>{screenplays.films.length} scénarios cinématographiques</p>
            <div className="category-preview">
              {screenplays.films.slice(0, 2).map(film => (
                <span key={film.id} className="preview-title">{film.title}</span>
              ))}
            </div>
          </div>
          
          <div className="category-card" onClick={() => handleCategoryClick('series')}>
            <div className="category-icon">📺</div>
            <h3>Séries</h3>
            <p>{screenplays.series.length} séries complètes</p>
            <div className="category-preview">
              {screenplays.series.slice(0, 2).map(series => (
                <span key={series.id} className="preview-title">{series.title}</span>
              ))}
            </div>
          </div>
          
          <div className="category-card" onClick={() => handleCategoryClick('documentaires')}>
            <div className="category-icon">🎥</div>
            <h3>Documentaires</h3>
            <p>{screenplays.documentaires.length} documentaires immersifs</p>
            <div className="category-preview">
              {screenplays.documentaires.slice(0, 2).map(doc => (
                <span key={doc.id} className="preview-title">{doc.title}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-content">
          <h2>À Propos de RomanScript</h2>
          <p>
            Bienvenue dans l'univers créatif d'Alex Moreau, où chaque histoire prend vie à travers 
            des scénarios soigneusement élaborés. De la fantaisie romantique aux documentaires culturels, 
            découvrez une collection diverse d'œuvres qui explorent la condition humaine et l'art de raconter.
          </p>
        </div>
      </div>
    </div>
  );

  const renderCategory = () => {
    const works = screenplays[selectedCategory] || [];
    const categoryTitle = selectedCategory === 'films' ? 'Films' : 
                         selectedCategory === 'series' ? 'Séries' : 'Documentaires';

    return (
      <div className="category-container">
        <div className="category-header">
          <button className="back-button" onClick={handleBackToHome}>
            ← Retour à l'accueil
          </button>
          <div className="category-title-section">
            <h1 className="category-title">{categoryTitle}</h1>
            <p className="category-description">
              {selectedCategory === 'films' && "Des histoires cinématographiques captivantes"}
              {selectedCategory === 'series' && "Des séries complètes pour l'écran"}
              {selectedCategory === 'documentaires' && "Des documentaires qui explorent et inspirent"}
            </p>
          </div>
        </div>

        <div className="works-grid">
          {works.map(work => (
            <div key={work.id} className="work-card" onClick={() => handleWorkClick(work)}>
              <div className="work-image">
                <img src={work.image} alt={work.title} />
                <div className="work-overlay">
                  <button className="read-button">📖 Lire</button>
                </div>
              </div>
              <div className="work-info">
                <h3 className="work-title">{work.title}</h3>
                <div className="work-meta">
                  <span className="work-year">{work.year}</span>
                  <span className="work-genre">{work.genre}</span>
                </div>
                <p className="work-synopsis">{work.synopsis}</p>
                <div className="work-stats">
                  <span className="episodes-count">
                    {work.episodes.length} {work.episodes.length === 1 ? 'chapitre' : 'chapitres'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWork = () => {
    if (!selectedWork) return null;

    return (
      <div className="work-detail-container">
        <div className="work-detail-header">
          <button className="back-button" onClick={handleBackToCategory}>
            ← Retour aux {selectedCategory}
          </button>
        </div>

        <div className="work-detail-content">
          <div className="work-detail-image">
            <img src={selectedWork.image} alt={selectedWork.title} />
            <div className="work-stats-overlay">
              <div className="stat-badge">{selectedWork.episodes.length} Chapitres</div>
              <div className="stat-badge">{selectedWork.year}</div>
            </div>
          </div>
          
          <div className="work-detail-info">
            <h1 className="work-detail-title">{selectedWork.title}</h1>
            <div className="work-detail-meta">
              <span className="badge genre-badge">{selectedWork.genre}</span>
              <span className="badge year-badge">{selectedWork.year}</span>
            </div>
            <p className="work-detail-synopsis">{selectedWork.synopsis}</p>
            
            <div className="episodes-section">
              <h3 className="episodes-title">
                {selectedCategory === 'films' ? 'Scénario' : 'Chapitres & Épisodes'}
              </h3>
              <div className="episodes-list">
                {selectedWork.episodes.map((episode, index) => (
                  <div key={index} className="episode-item">
                    <div className="episode-info">
                      <div className="episode-number">
                        {selectedCategory !== 'films' ? `${index + 1}.` : '📄'}
                      </div>
                      <div className="episode-details">
                        <h4 className="episode-title">{episode.title}</h4>
                        <p className="episode-meta">PDF • Prêt à télécharger</p>
                      </div>
                    </div>
                    <button 
                      className="download-button"
                      onClick={() => handleDownloadPDF(episode.filename)}
                    >
                      ⬇️ Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-logo" onClick={handleBackToHome}>
            RomanScript
          </h1>
          <div className="nav-links">
            <button 
              className={currentView === 'home' ? 'nav-link active' : 'nav-link'}
              onClick={handleBackToHome}
            >
              Accueil
            </button>
            <button 
              className={selectedCategory === 'films' ? 'nav-link active' : 'nav-link'}
              onClick={() => handleCategoryClick('films')}
            >
              Films
            </button>
            <button 
              className={selectedCategory === 'series' ? 'nav-link active' : 'nav-link'}
              onClick={() => handleCategoryClick('series')}
            >
              Séries
            </button>
            <button 
              className={selectedCategory === 'documentaires' ? 'nav-link active' : 'nav-link'}
              onClick={() => handleCategoryClick('documentaires')}
            >
              Documentaires
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {currentView === 'home' && renderHome()}
        {currentView === 'category' && renderCategory()}
        {currentView === 'work' && renderWork()}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RomanScript</h3>
            <p>Pour les passionnés d'écriture et de lecture</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Alex Moreau - Scénariste</p>
            <p>alex@romanscript.com</p>
          </div>
          <div className="footer-section">
            <h4>Catégories</h4>
            <button onClick={() => handleCategoryClick('films')}>Films</button>
            <button onClick={() => handleCategoryClick('series')}>Séries</button>
            <button onClick={() => handleCategoryClick('documentaires')}>Documentaires</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 RomanScript. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;


