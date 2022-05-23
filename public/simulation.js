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

  let uShape;

  Render.run(render);

  const getMultiplier = (maxHeight) => {
    const maxCanvasHeight = 600;
    return maxCanvasHeight / maxHeight;
  }

  const addObjects = (dimensions, data) => {
    // Construct ground
    const groundY = 600;
    const groundHeight = 50;
    const ground = Bodies.rectangle(400, groundY, 1000, groundHeight, { isStatic: true });

    const multiplier = getMultiplier(data[0].y * 1.25);

    const baseX = 400;
    const leftX = baseX - dimensions.base * multiplier / 2;
    const rightX = baseX + dimensions.base * multiplier / 2;
    const baseY = groundY - groundHeight / 2 - data[0].y * multiplier;
    const leftY = baseY - dimensions.height * multiplier / 2;
    const rightY = baseY - dimensions.height * multiplier / 2;

    // Construct U
    const leftSide = Bodies.rectangle(leftX, leftY, 0.5, dimensions.height * multiplier);
    const rightSide = Bodies.rectangle(rightX, rightY, 0.5, dimensions.height * multiplier);
    const bottom = Bodies.rectangle(baseX, baseY, dimensions.base * multiplier, 0.5);

    uShape = Composite.create()
    Composite.add(uShape, leftSide);
    Composite.add(uShape, rightSide);
    Composite.add(uShape, bottom);

    World.add(engine.world, [ground, uShape]);
  }

  function updateLoop(data) {
    setTimeout(function() {
      const row = data.shift();
      //Composite.translate(uShape, { x: 0, y: 0.2 });

      if (data.length >= 1) {
        updateLoop(data);
      }
    }, 5);
  }

  const loadData = async () => {
    const response = await fetch('/api/load-data');
    const json = await response.json();

    addObjects(json.dimensions, json.data);
    updateLoop(json.data);
  }

  loadData();

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });
})()