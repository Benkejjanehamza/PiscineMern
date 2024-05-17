#!/bin/bash

backup_students() {
    mongoexport --uri mongodb://localhost:27042 --db mern-pool --collection students --out backup/students_backup.json --jsonArray
    echo "Backup saved in folder backup."
}

restore_students() {
    mongoimport --uri mongodb://localhost:27042 --db mern-pool --collection students --file backup/students_backup.json --jsonArray
    echo "Database restored from backup folder."
}

if [ "$1" == "save" ]; then
    backup_students
elif [ "$1" == "restore" ]; then
    restore_students
else
    echo "[ERROR] usage: $0 [save|restore]"
fi