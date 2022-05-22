(function() {
  const canvas = document.getElementById('simulation');

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;

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

  World.add(engine.world, [ground, leftSide, rightSide, bottom]);

  let i = 1;
  const numberOfLoops = 20;
  function updateLoop() {
    setTimeout(function() {
      const xChange = 0;
      const yChange = 10;

      const newLeft = {
        x: leftSide.position.x + xChange,
        y: leftSide.position.y + yChange,
      };
      const newRight = {
        x: rightSide.position.x + xChange,
        y: rightSide.position.y + yChange,
      };
      const newBottom = {
        x: bottom.position.x + xChange,
        y: bottom.position.y + yChange,
      };

      Body.setPosition(leftSide, newLeft);
      Body.setPosition(rightSide, newRight);
      Body.setPosition(bottom, newBottom);

      if (i++ < numberOfLoops) {
        updateLoop();
      }
    }, 50);
  }

  updateLoop();

  const loadData = async () => {
    const response = await fetch('/api/load-data');
    const json = await response.json();
    console.log(json.data);
  }

  loadData();

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });
})()