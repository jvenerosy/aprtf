<section class="section social-section">
    <div class="container is-max-desktop">
        <div class="row">
            <div class="columns">
                <div class="column">
                    <h2 class="title is-2">Nous suivre et découvrir</h2>
                    <div class="social-content">
                        <div class="social-group">
                            <h3 class="social-subtitle">LinkedIn</h3>
                            <div class="social-links">
                                <div class="social-link">
                                    <a href="https://www.linkedin.com/company/aprtf/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                                        <div class="logo-container linkedin">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                                            </svg>
                                        </div>
                                        <span>Page APRTF</span>
                                    </a>
                                </div>
                                <div class="social-link">
                                    <a href="https://www.linkedin.com/in/no%C3%ABl-pommepuy-4159b154/" target="_blank" rel="noopener noreferrer">
                                        <img src="/images/photos/noel-pommepuy.webp" srcset="/images/photos/noel-pommepuy@2x.webp 2x" alt="" class="profile-photo" width="40" height="40" loading="lazy">
                                        <span>Noël Pommepuy</span>
                                    </a>
                                </div>
                                <div class="social-link">
                                    <a href="https://www.linkedin.com/in/marie-christine-beaucousin-7b06b6362/" target="_blank" rel="noopener noreferrer">
                                        <img src="/images/photos/marie-christine-beaucousin.webp" srcset="/images/photos/marie-christine-beaucousin@2x.webp 2x" alt="" class="profile-photo" width="40" height="40" loading="lazy">
                                        <span>Marie Christine Beaucousin</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="social-group">
                            <h3 class="social-subtitle">Médias</h3>
                            <div class="social-links">
                                <div class="social-link">
                                    <a href="/inscription-newsletter">
                                        <div class="logo-container newsletter">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                            </svg>
                                        </div>
                                        <span>S'inscrire à notre newsletter</span>
                                    </a>
                                </div>
                                <div class="social-link">
                                    <a href="https://open.spotify.com/episode/0J6exzzc3sTuCbxPvygjTu?si=kGhQbtP2TNOGQkiS_2F3Rg&nd=1&dlsi=d0a2443f52ef4850" target="_blank" rel="noopener noreferrer">
                                        <div class="logo-container spotify">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.420 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                        </div>
                                        <span>Les thérapies familiales et multifamiliales, avec Noël Pommepuy sur Spotify</span>
                                    </a>
                                </div>
                                <div class="social-link">
                                    <a href="https://www.arte.tv/fr/videos/126522-000-A/schizophrenie-la-therapie-multifamiliale/" target="_blank" rel="noopener noreferrer">
                                        <div class="logo-container arte">
                                            <img src="https://static-cdn.arte.tv/replay/favicons/favicon-32x32.png" alt="Arte" />
                                        </div>
                                        <span>Schizophrénie : la thérapie multifamiliale sur Arte</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../styles/variables.scss' as *;

    .social-section {
        text-align: center;

        @media screen and (min-width: $b-desktop) {
            text-align: left;
        }
    }

    .title.is-2 {
        margin-bottom: calc($gap*2);
    }

    .social-content {
        display: flex;
        flex-direction: column;
        gap: calc($gap*2);
        margin-top: calc($gap*2);

        @media screen and (min-width: $b-desktop) {
            flex-direction: row;
            gap: calc($gap*4);
        }
    }

    .social-group {
        flex: 1;
    }

    .social-subtitle {
        font-family: $family-title;
        font-size: $size-title-3;
        margin-bottom: calc($gap);
        color: $primary;
        border-bottom: 2px solid $tertiary;
        padding-bottom: calc($gap/2);
        display: inline-block;
    }

    .social-links {
        display: flex;
        flex-direction: column;
        gap: calc($gap);
    }

    .social-link {
        background: $grey-lighter;
        border-radius: 8px;
        padding: calc($gap);
        transition: all 0.3s ease;
        border-left: 4px solid transparent;
        
        @media screen and (min-width: $b-desktop) {
            min-height: 80px;
            display: flex;
            align-items: center;
        }

        &:hover {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-left-color: $tertiary;
            transform: translateX(4px);
        }

        a {
            display: flex;
            align-items: center;
            gap: calc($gap);
            color: $primary;
            text-decoration: none;
            font-weight: 500;
            
            @media screen and (min-width: $b-desktop) {
                width: 100%;
                min-height: 48px;
            }

            &:hover {
                color: $tertiary;
            }
        }

        .logo-container {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            &.linkedin {
                background-color: #0077b5;
            }

            &.spotify {
                background-color: #1db954;
            }

            &.arte {
                background-color: #e84a28;
            }

            &.newsletter {
                background-color: $tertiary;
            }

            svg {
                color: white;
            }
        }

        .profile-photo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
            border: 3px solid #0077b5;
        }

        span {
            font-weight: 600;
        }
    }

    .row {
        margin-bottom: calc($gap*2);
    }
</style>