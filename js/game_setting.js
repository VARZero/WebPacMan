let map, en; // map 정보, 적 갯수

map = [ // 0-Space 2-Wall 3-EnemySpawn 4-Player 5-BounsCoin
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,2,5,0,0,0,2,0,0,5,0,0,2,0,0,0,5,2,0,2],
    [2,0,2,2,2,2,0,2,0,2,2,2,0,2,0,2,2,2,2,0,2],
    [2,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,2],
    [2,0,2,2,0,2,0,2,0,2,3,2,0,2,0,2,0,2,2,0,2],
    [2,5,0,2,0,0,0,0,0,2,2,2,0,0,0,0,0,2,0,5,2],
    [2,2,2,2,0,2,0,2,0,2,2,2,0,2,0,2,0,2,2,2,2],
    [2,0,0,0,0,2,0,2,0,0,4,0,0,2,0,2,0,0,0,0,2],
    [2,0,2,2,0,2,0,2,2,2,0,2,2,2,0,2,0,2,2,0,2],
    [2,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];
en = 4;