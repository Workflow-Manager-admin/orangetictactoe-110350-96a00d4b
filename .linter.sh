#!/bin/bash
cd /home/kavia/workspace/code-generation/orangetictactoe-110350-96a00d4b/orange_tictactoe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

