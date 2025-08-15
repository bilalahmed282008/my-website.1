const obstaclesContainer = document.getElementById('obstacles');

// Base64 train image (blue rectangle)
const trainBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAtUlEQVR4Xu3RMQ0AAAgDINc/9K3hNgBMoo8eYnTvvjUdd3QhQZRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMlEzUTJRMLyLDDZ1DkYfA96AXVAAAAAElFTkSuQmCC";

function createTrain() {
  const train = document.createElement('img');
  train.src = trainBase64;
  train.classList.add('train');
  
  // Random lane position (4 lanes)
  const lanes = [50, 150, 250, 350];
  const lane = lanes[Math.floor(Math.random() * lanes.length)];
  train.style.left = lane + 'px';
  train.style.top = '-100px';
  
  obstaclesContainer.appendChild(train);

  let pos = -100;
  const speed = 8;

  function move() {
    pos += speed;
    train.style.top = pos + 'px';

    if (pos > 600) {
      obstaclesContainer.removeChild(train);
    } else {
      requestAnimationFrame(move);
    }
  }
  requestAnimationFrame(move);
}

setInterval(createTrain, 1500);
