const About = () => {
  return (
    <div className="bg-secondary">
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Nossa História</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Paixão por sabor, compromisso com a qualidade.
        </p>
      </div>
      <div className="container pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://img.usecurling.com/p/800/600?q=spice%20shop%20interior"
              alt="Interior da loja Condimentos Batista"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              De uma pequena cozinha para a sua casa
            </h2>
            <p className="text-muted-foreground">
              A Condimentos Batista nasceu do amor pela culinária e da busca
              incessante por ingredientes que realmente fazem a diferença. O que
              começou como um hobby, criando misturas de temperos para amigos e
              familiares, rapidamente se transformou em uma missão: compartilhar
              sabores autênticos e de alta qualidade com o maior número de
              pessoas possível.
            </p>
            <p className="text-muted-foreground">
              Cada um de nossos produtos é selecionado com o máximo cuidado,
              priorizando produtores locais e práticas sustentáveis. Acreditamos
              que um bom prato começa com bons ingredientes, e é por isso que
              nos dedicamos a oferecer apenas o melhor.
            </p>
            <p className="text-muted-foreground">
              Nossa jornada é movida pela alegria de ver nossos clientes
              transformando suas refeições em momentos especiais. Obrigado por
              fazer parte da nossa história!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
