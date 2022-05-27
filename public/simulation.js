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

  let leftSide;
  let rightSide;
  let bottom;
  let multiplier;

  Render.run(render);

  const getMultiplier = (maxHeight) => {
    const maxCanvasHeight = 600;
    return maxCanvasHeight / maxHeight;
  }

  const addObjects = (dimensions, initialConditions) => {
    // Construct ground
    const groundY = 600;
    const groundHeight = 50;
    const ground = Bodies.rectangle(400, groundY, 1000, groundHeight, { isStatic: true });

    multiplier = getMultiplier(initialConditions.y * 1.25);

    const baseX = 400;
    const leftX = baseX - dimensions.base * multiplier / 2;
    const rightX = baseX + dimensions.base * multiplier / 2;
    const baseY = groundY - groundHeight / 2 - (initialConditions.y - dimensions.cm) * multiplier;
    const leftY = baseY - dimensions.height * multiplier / 2;
    const rightY = baseY - dimensions.height * multiplier / 2;

    // Construct U
    leftSide = Bodies.rectangle(leftX, leftY, 0.5, dimensions.height * multiplier);
    rightSide = Bodies.rectangle(rightX, rightY, 0.5, dimensions.height * multiplier);
    bottom = Bodies.rectangle(baseX, baseY, dimensions.base * multiplier, 0.5);

    World.add(engine.world, [ground, leftSide, rightSide, bottom]);

    Body.rotate(leftSide, initialConditions.theta, { x: baseX, y: baseY - dimensions.cm * multiplier });
    Body.rotate(rightSide, initialConditions.theta, { x: baseX, y: baseY - dimensions.cm * multiplier });
    Body.rotate(bottom, initialConditions.theta, { x: baseX, y: baseY - dimensions.cm * multiplier });
  }

  function updateLoop(data) {
    setTimeout(function() {
      const row = data.shift();
      Body.translate(leftSide, { x: 0, y: row.y * multiplier });
      Body.translate(rightSide, { x: 0, y: row.y * multiplier });
      Body.translate(bottom, { x: 0, y: row.y * multiplier });

      if (data.length >= 1) {
        updateLoop(data);
      }
    }, 5);
  }

  const loadData = async () => {
    const response = await fetch('/api/load-data');
    const json = await response.json();

    addObjects(json.dimensions, json.initial);
    updateLoop(json.data);
  }

  loadData();

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });
})()