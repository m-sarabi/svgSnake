// snake tail
const tailSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const tailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
tailPath.setAttribute('d', 'M 80 20 L 20 20 C 0 20 0 60 20 60 L 80 60');
tailPath.setAttribute('fill', 'orange');
tailPath.setAttribute('stroke', 'black');
tailSVG.appendChild(tailPath);

// snake body curved
const bodyCurveSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const bodyCurvePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyCurvePath.setAttribute('d', 'M 0 60 C 0 46 0 32 0 20 C 30 20 60 50 60 80 C 46.6667 80 33.3333 80 20 80 C 20 70 10 60 0 60');
bodyCurvePath.setAttribute('fill', 'orange');
const bodyCurvePathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyCurvePathStroke.setAttribute('d', 'M 0 20 C 30 20 60 50 60 80 M 20 80 C 20 70 10 60 0 60');
bodyCurvePathStroke.setAttribute('fill', 'transparent');
bodyCurvePathStroke.setAttribute('stroke', 'black');
bodyCurveSVG.appendChild(bodyCurvePath);
bodyCurveSVG.appendChild(bodyCurvePathStroke);

// snake body straight
const bodyStraightSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const bodyStraightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyStraightPath.setAttribute('d', 'M 0 60 C 0 46.6667 0 33.3333 0 20 C 26.6667 20 53.3333 20 80 20 C 80 33.3333 80 46.6667 80 60 C 53.3333 60 26.6667 60 0 60');
bodyStraightPath.setAttribute('fill', 'orange');
const bodyStraightPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
bodyStraightPathStroke.setAttribute('d', 'M 0 20 C 26.6667 20 53.3333 20 80 20 M 80 60 C 53.3333 60 26.6667 60 0 60');
bodyStraightPathStroke.setAttribute('fill', 'transparent');
bodyStraightPathStroke.setAttribute('stroke', 'black');
bodyStraightSVG.appendChild(bodyStraightPath);
bodyStraightSVG.appendChild(bodyStraightPathStroke);

// snake head
const headMainD = 'M 0 60 C 6.6667 60 13.3333 60 20 60 C 27 67 33 67 40 60 C 46.6667 60 53.3333 60 60 60 C 80 60 80 20 60 20 C 53.3333 20 46.6667 20 40 20 C 33 13 27 13 20 20 C 13.3333 20 6.6667 20 0 20';
const headNoseD = 'M 65 30 C 66 32 66 33 65 35 M 65 50 C 66 48 66 47 65 45';
const headEyesD = 'M 30 20 C 35 20 35 25 30 25 C 26 25 26 20 30 20 M 30 60 C 35 60 35 55 30 55 C 26 55 26 60 30 60';

const headSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
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
eyesAnimate.setAttribute('values', 'M 30 20 C 35 20 35 25 30 25 C 26 25 26 20 30 20 M 30 60 C 35 60 35 55 30 55 C 26 55 26 60 30 60;' +
    'M 30 20 C 35 20 35 25 30 25 C 26 25 26 20 30 20 M 30 60 C 35 60 35 55 30 55 C 26 55 26 60 30 60;' +
    'M 30 20 C 35 20 35 25 30 25 C 35 25 35 20 30 20 M 30 60 C 35 60 35 55 30 55 C 35 55 35 60 30 60;' +
    'M 30 20 C 35 20 35 25 30 25 C 26 25 26 20 30 20 M 30 60 C 35 60 35 55 30 55 C 26 55 26 60 30 60');
eyesAnimate.setAttribute('keyTimes', '0;0.7;0.85;1');
eyesAnimate.setAttribute('dur', '5s');
eyesAnimate.setAttribute('repeatCount', 'indefinite');
headEyes.appendChild(eyesAnimate);
headGroup.appendChild(headMain);
headGroup.appendChild(headNose);
headGroup.appendChild(headEyes);
headSVG.appendChild(headGroup);

document.body.appendChild(headSVG);

function rotatePath(svgPath) {
    const parts = svgPath.split(/(?=[MC])/);
    let rotatedPath = '';
    for (const part of parts) {
        const type = part[0];
        const coords = part.slice(1).trim().split(/\s+/);
        switch (type) {
            case 'M':
                rotatedPath += `${type} ${-parseFloat(coords[1]) + 80} ${parseFloat(coords[0])} `;
                break;
            case 'C':
                rotatedPath += `${type} ${-parseFloat(coords[1]) + 80} ${parseFloat(coords[0])} ${-parseFloat(coords[3]) + 80} ${parseFloat(coords[2])} ${-parseFloat(coords[5]) + 80} ${parseFloat(coords[4])}     `;
        }
    }
    return rotatedPath.trim().replace(/  +/, ' ');
}

function movePath(svgPath, x, y) {
    const parts = svgPath.split(/(?=[MC])/);
    let translatedPath = '';
    for (const part of parts) {
        const type = part[0];
        const coords = part.slice(1).trim().split(/\s+/);
        switch (type) {
            case 'M':
                translatedPath += `${type} ${parseFloat(coords[0]) + x} ${parseFloat(coords[1]) + y} `;
                break;
            case 'C':
                translatedPath += `${type} ${parseFloat(coords[0]) + x} ${parseFloat(coords[1]) + y} ${parseFloat(coords[2]) + x} ${parseFloat(coords[3]) + y} ${parseFloat(coords[4]) + x} ${parseFloat(coords[5]) + y}     `;
        }
    }
    return translatedPath.trim().replace(/  +/, ' ');
}
