export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <p className="footer__wordmark">
            ORION<span>+</span>
          </p>
          <p className="footer__note">
            Estrutura principal de um app de streaming premium — catálogo fictício com arte gerada localmente, sem
            dependências externas de imagem.
          </p>
        </div>
        <div className="footer__col">
          <h3>Navegar</h3>
          <p>Início</p>
          <p>Filmes</p>
          <p>Séries</p>
          <p>Catálogo</p>
        </div>
        <div className="footer__col">
          <h3>Dispositivos</h3>
          <p>Android e iPhone</p>
          <p>Tablets</p>
          <p>Smart TV e TV Box</p>
          <p>Computadores</p>
        </div>
        <div className="footer__col">
          <h3>Acessibilidade</h3>
          <p>Navegação por teclado e controle</p>
          <p>Alto contraste no tema escuro</p>
          <p>Legendas descritivas</p>
          <p>Áudio descrição</p>
        </div>
      </div>
      <p className="footer__legal">ORION+ · Projeto de demonstração. Nenhum conteúdo real é transmitido.</p>
    </footer>
  )
}
