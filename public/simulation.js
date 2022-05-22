(function() {
  const canvas = document.getElementById('simulation');

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Composite = Matter.Composite;

  const engine = Engine.create();

  const render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      width: 1000,
      height: 600,
    },
  });

  Render.run(render);

  // Construct ground
  const ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true });

  // Construct U
  const leftSide = Bodies.rectangle(500, 300, 2, 120);
  const rightSide = Bodies.rectangle(600, 300, 2, 120);
  const bottom = Bodies.rectangle(550, 360, 100, 2);

  const uShape = Composite.create()
  Composite.add(uShape, leftSide);
  Composite.add(uShape, rightSide);
  Composite.add(uShape, bottom);

  World.add(engine.world, [ground, uShape]);

  function updateLoop(data) {
    setTimeout(function() {
      const row = data.shift();
      Composite.translate(uShape, { x: 0, y: 0.2 });

      if (data.length >= 1) {
        updateLoop(data);
      }
    }, 5);
  }

  const loadData = async () => {
    const response = await fetch('/api/load-data');
    const json = await response.json();

    updateLoop(json.data);
  }

  loadData();

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });
})()