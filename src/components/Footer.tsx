import { Link } from 'react-router-dom'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold text-primary mb-4">
              Condimentos Batista
            </h3>
            <p className="text-sm text-muted-foreground">
              Sabor e qualidade que transformam suas receitas.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos"
                  className="hover:text-primary transition-colors"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <address className="not-italic text-sm space-y-2 text-muted-foreground">
              <p>Rua dos Sabores, 123, São Paulo - SP</p>
              <p>contato@condimentosbatista.com</p>
              <p>(11) 99999-8888</p>
            </address>
            <div className="flex items-center space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Condimentos Batista. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
