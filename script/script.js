const cellSize = 40;

const tailPathD = 'M 40 10 C 35 10 15 10 10 10 C 0 10 0 30 10 30 C 15 30 35 30 40 30';

// snake tail
const tailSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
tailSVG.setAttribute('class', 'part');
tailSVG.style.position = 'absolute';
const tailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
tailPath.setAttribute('d', tailPathD);
tailPath.setAttribute('fill', 'orange');
tailPath.setAttribute('stroke', 'black');
tailSVG.appendChild(tailPath);

const bodyCurvedD = 'M 0 30 C 0 25 0 15 0 10 C 15 10 30 25 30 40 C 25 40 15 40 10 40 C 10 35 5 30 0 30';
const bodyCurvedStrokeD = 'M 0 10 C 15 10 30 25 30 40 M 10 40 C 10 35 5 30 0 30';

// snake body curved
const bodyCurveSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
bodyCurveSVG.setAttribute('class', 'part');
bodyCurveSVG.style.position = 'absolute';
const bodyCurvePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyCurvePath.setAttribute('d', bodyCurvedD);
bodyCurvePath.setAttribute('fill', 'orange');
const bodyCurvePathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyCurvePathStroke.setAttribute('d', bodyCurvedStrokeD);
bodyCurvePathStroke.setAttribute('fill', 'transparent');
bodyCurvePathStroke.setAttribute('stroke', 'black');
bodyCurveSVG.appendChild(bodyCurvePath);
bodyCurveSVG.appendChild(bodyCurvePathStroke);

const bodyStraightD = 'M 0 30 C 0 25 0 15 0 10 C 5 10 35 10 40 10 C 40 15 40 25 40 30 C 35 30 5 30 0 30';
const bodyStraightStrokeD = 'M 0 10 C 5 10 35 10 40 10 M 40 30 C 35 30 5 30 0 30';

// snake body straight
const bodyStraightSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
bodyStraightSVG.setAttribute('class', 'part');
bodyStraightSVG.style.position = 'absolute';
const bodyStraightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyStraightPath.setAttribute('d', bodyStraightD);
bodyStraightPath.setAttribute('fill', 'orange');
const bodyStraightPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyStraightPathStroke.setAttribute('d', bodyStraightStrokeD);
bodyStraightPathStroke.setAttribute('fill', 'transparent');
bodyStraightPathStroke.setAttribute('stroke', 'black');
bodyStraightSVG.appendChild(bodyStraightPath);
bodyStraightSVG.appendChild(bodyStraightPathStroke);

// snake head
const headMainD = 'M 0 30 C 5 30 5 30 10 30 C 15 35 15 35 20 30 C 25 30 25 30 30 30 C 40 30 40 10 30 10 C 25 10 25 10 20 10 C 15 5 15 5 10 10 C 5 10 5 10 0 10';
const headNoseD = 'M 33 15 C 34 16 34 17 33 18 M 33 25 C 34 24 34 23 33 22';
const headEyesD = 'M 15 10 C 18 10 18 13 15 13 C 13 13 13 10 15 10 M 15 30 C 18 30 18 27 15 27 C 13 27 13 30 15 30';
const headEyesClosedD = 'M 15 10 C 18 10 18 13 15 13 C 18 13 18 10 15 10 M 15 30 C 18 30 18 27 15 27 C 18 27 18 30 15 30';

const headSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
headSVG.setAttribute('class', 'part');
headSVG.style.position = 'absolute';
const headGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
const headMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
headMain.setAttribute('d', headMainD);
headMain.setAttribute('fill', 'orange');
headMain.setAttribute('stroke', 'black');
const headNose = document.createElementNS('http://www.w3.org/2000/svg', 'path');
headNose.setAttribute('d', headNoseD);
headNose.setAttribute('fill', 'transparent');
headNose.setAttribute('stroke', 'black');
headNose.setAttribute('stroke-linecap', 'round');
const headEyes = document.createElementNS('http://www.w3.org/2000/svg', 'path');
headEyes.setAttribute('d', headEyesD);
headEyes.setAttribute('fill', 'white');
headEyes.setAttribute('stroke', 'black');
const eyesAnimate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
eyesAnimate.setAttribute('attributeName', 'd');
eyesAnimate.setAttribute('values', headEyesD + ';' + headEyesD + ';' + headEyesClosedD + ';' + headEyesD);
eyesAnimate.setAttribute('keyTimes', '0;0.7;0.85;1');
eyesAnimate.setAttribute('dur', '5s');
eyesAnimate.setAttribute('repeatCount', 'indefinite');
headEyes.appendChild(eyesAnimate);
headGroup.appendChild(headMain);
headGroup.appendChild(headNose);
headGroup.appendChild(headEyes);
headSVG.appendChild(headGroup);

function rotatePath(svgPath) {
    const parts = svgPath.trim().replace(/  +/, ' ').split(/(?=[MC])/);
    let rotatedPath = '';
    for (const part of parts) {
        const type = part[0];
        const coords = part.slice(1).trim().split(/\s+/);
        switch (type) {
            case 'M':
                rotatedPath += `${type} ${-parseFloat(coords[1]) + cellSize} ${parseFloat(coords[0])} `;
                break;
            case 'C':
                rotatedPath += `${type} ${-parseFloat(coords[1]) + cellSize} ${parseFloat(coords[0])} ${-parseFloat(coords[3]) + cellSize} ${parseFloat(coords[2])} ${-parseFloat(coords[5]) + cellSize} ${parseFloat(coords[4])}     `;
        }
    }
    return rotatedPath.trim().replace(/  +/, ' ');
}

function movePart(part, direction) {
    let x, y;
    switch (direction) {
        case 'up':
            [x, y] = [0, -cellSize];
            break;
        case 'right':
            [x, y] = [cellSize, 0];
            break;
        case 'down':
            [x, y] = [0, cellSize];
            break;
        case 'left':
            [x, y] = [-cellSize, 0];
            break;
    }
    part.x += x;
    part.y += y;
    part.element.style.transform = `translate(${part.x}px, ${part.y}px)`;
}

function rotatePart(part) {
    let children;
    if (part.type === 'head') {
        children = part.element.children[0].children;
        let childAnim = children[2].children[0];
        let animPaths = childAnim.getAttribute('values').split(';');
        for (let i = 0; i < animPaths.length; i++) {
            animPaths[i] = rotatePath(animPaths[i]);
        }
        childAnim = animPaths.join(';');
        children[2].children[0].setAttribute('values', childAnim);
    } else {
        children = part.element.children;
    }
    for (const child of children) {
        let path = rotatePath(child.getAttribute('d'));
        child.setAttribute('d', path);
    }
}

let newPart = function (type, direction) {
    let element;
    switch (type) {
        case 'head':
            element = headSVG.cloneNode(true);
            break;
        case 'body':
            element = bodyStraightSVG.cloneNode(true);
            break;
        case 'bodyC':
            element = bodyCurveSVG.cloneNode(true);
            break;
        case 'tail':
            element = tailSVG.cloneNode(true);
    }
    return {
        element: element,
        type,
        direction,
        x: 0,
        y: 0,
    };
};

function moveSnake() {
    if (direction === snake.at(0).direction) {
        movePart(snake.at(0), direction);
    } else if (direction === 'down' && snake.at(0).direction === 'right') {
        rotatePart(snake.at(0));
        movePart(snake.at(0), direction);
        snake.at(0).direction = direction;
    }
    for (let i = snake.length - 1; i > 0; i--) {
        if (snake.at(i).type === 'body' && snake.at(i).direction !== snake.at(i - 1).direction) {
            let children = snake.at(i).element.children;
            children[0].setAttribute('d', bodyCurvedD);
            children[1].setAttribute('d', bodyCurvedStrokeD);
            movePart(snake.at(i), 'right');
            snake.at(i).direction = snake.at(i - 1).direction;
        } else {
            movePart(snake.at(i), snake.at(i - 1).direction);
        }
    }
}

let snake = [];
snake.push(newPart('head', 'right'));
movePart(snake.at(-1), 'right');
movePart(snake.at(-1), 'right');
snake.push(newPart('body', 'right'));
movePart(snake.at(-1), 'right');
snake.push(newPart('tail', 'right'));

snake.forEach(function (part) {
    document.body.appendChild(part.element);
});

let direction = 'down';
document.addEventListener('click', function () {
    moveSnake();
});