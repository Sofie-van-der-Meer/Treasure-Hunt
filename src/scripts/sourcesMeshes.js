export default [
    {
        name: 'grass',
        type: 'BoxGeometry',
        width: 15,
        height: 0.5,
        depth: 15,
        color: '#C3EB78',
        x: 0,
        y: -0.25,
        z: 0
    },    
    {
        name: 'soil',
        type: 'BoxGeometry',
        width: 14.5,
        height: 1.5,
        depth: 14.5,
        color: '#7F675B',
        x: 0,
        y: -1.25,
        z: 0
    },
    {
        name: 'stone',
        type: 'IcosahedronGeometry',
        radius: 0.5,
        detail: 0,
        color: '#1C5253',
        x: 0,
        y: 0.2,
        z: 0
    },
    {
        name: 'berry',
        type: 'OctahedronGeometry',
        radius: 0.25,
        detail: 0,
        color: '#B6174B',
        x: 2,
        y: 0.35,
        z: 0
    }
]