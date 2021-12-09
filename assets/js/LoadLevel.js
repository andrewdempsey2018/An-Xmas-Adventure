const loadLevel = async () => {
    const levelData = await fetch('./assets/levels/level1.json');
    return levelData.json();
}

export default loadLevel;