const chalk = require("chalk");
const fs = require("fs");

// Save notes brain

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
// ----- save end

// Load notes brain
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
// ------ Load note end

// List note brain
const listNote = () => {
  const notes = loadNotes();
  console.log(chalk.bgBlueBright.white.italic("Your Notes:"));
  notes.forEach((note) => {
    console.log(chalk.cyanBright("-" + note.title));
  });
};
// ---- list note end

// Add note brain
const addNote = (title, body) => {
  const notes = loadNotes();

  // check for dup titles
  const duplicate = notes.find((note) => note.title === title);

  if (!duplicate) {
    // logic for pushing
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreenBright.white.italic("Note Saved Successfully"));
  } else {
    console.log(chalk.red.bold.inverse("Need unique title"));
  }
};
// -----add note end

// Remove note brain
const removeNote = (title) => {
  const notes = loadNotes();

  const keepers = notes.filter((note) => note.title !== title);

  if (keepers.length < notes.length) {
    console.log(
      chalk.bgRedBright.white(title) +
        chalk.bgRedBright.whiteBright(" was removed.")
    );
  } else {
    console.log(
      chalk.bgWhiteBright.red(title) +
        chalk.bgWhiteBright.redBright(" does not exist.")
    );
  }

  saveNotes(keepers);
};
// --- remove end

// read brain
const readNote = (title) => {
  const notes = loadNotes();

  const toRead = notes.find((note) => note.title === title);

  if (toRead) {
    console.log(chalk.bgGreenBright.yellowBright(toRead.title));
    console.log(chalk.yellowBright(toRead.body));
  } else {
    console.log(chalk.bgRedBright.white("Note does not exist!"));
  }
};

// --- end read

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};
