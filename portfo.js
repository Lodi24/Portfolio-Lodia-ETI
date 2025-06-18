// Fonction pour marquer le lien actif dans la navigation
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === 'index.html' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Validation du formulaire (pour la page contact)
function validateForm() {
    let isValid = true;
    const errors = {};

    // Nom
    const nom = document.getElementById('nom');
    if (nom) {
        const nomValue = nom.value.trim();
        if (!nomValue) {
            errors.nom = 'Le nom est requis';
            isValid = false;
        } else if (nomValue.length < 2) {
            errors.nom = 'Le nom doit contenir au moins 2 caractères';
            isValid = false;
        }
    }

    // Prénom
    const prenom = document.getElementById('prenom');
    if (prenom) {
        const prenomValue = prenom.value.trim();
        if (!prenomValue) {
            errors.prenom = 'Le prénom est requis';
            isValid = false;
        } else if (prenomValue.length < 2) {
            errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
            isValid = false;
        }
    }

    // Email
    const email = document.getElementById('email');
    if (email) {
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            errors.email = 'L\'email est requis';
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            errors.email = 'Format d\'email invalide';
            isValid = false;
        }
    }

    // Téléphone
    const telephone = document.getElementById('telephone');
    if (telephone) {
        const telephoneValue = telephone.value.trim();
        if (telephoneValue && telephoneValue.length > 0) {
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(telephoneValue)) {
                errors.telephone = 'Format de téléphone invalide';
                isValid = false;
            }
        }
    }

    // Message
    const message = document.getElementById('message');
    if (message) {
        const messageValue = message.value.trim();
        if (!messageValue) {
            errors.message = 'Le message est requis';
            isValid = false;
        } else if (messageValue.length < 10) {
            errors.message = 'Le message doit contenir au moins 10 caractères';
            isValid = false;
        }
    }

    // Afficher les erreurs
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(field + '-error');
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });

    // Effacer les erreurs pour les champs valides
    const allFields = ['nom', 'prenom', 'email', 'telephone', 'message'];
    allFields.forEach(field => {
        if (!errors[field]) {
            const errorElement = document.getElementById(field + '-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    });

    return isValid;
}

// Soumission du formulaire
function submitForm(event) {
    event.preventDefault();
    
    if (validateForm()) {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.innerHTML = '<div class="success">✅ Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</div>';
            
            // Réinitialiser le formulaire
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
            }
            
            // Faire défiler vers le message de confirmation
            formMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Animation des barres de compétences
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.dataset.width || bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Initialisation à la charge de la page
document.addEventListener('DOMContentLoaded', function() {
    // Marquer le lien actif
    setActiveNavLink();
    
    // Animer les barres de compétences si présentes
    if (document.querySelector('.skill-progress')) {
        setTimeout(animateSkillBars, 500);
    }
    
    // Effet typing pour le titre principal (page d'accueil)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Validation en temps réel pour le formulaire
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateForm();
        });
    });
    
    // Effets sur les cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});