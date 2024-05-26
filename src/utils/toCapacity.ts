const toCapacity = (text: string) => {
    return text
        .split(' ')
        .map((paragraph) => paragraph[0].toUpperCase() + paragraph.slice(1))
        .join(' ');
};

export default toCapacity;
