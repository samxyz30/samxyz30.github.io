---
layout: post.njk
title: cute game i want to share
date: 2026-11-22
tags: posts
---

i was looking through my old projects and i found this olld tic tac toe i wrote in C. i wanted to share.
its terminal based and very tiny. also i had to fix and port some things. have fun. ❤

compiles on anything with time and conio, `gcc ttt.c -o ttt`

{% raw %}
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <conio.h>

char board[3][3] = {{'.', '.', '.'}, {'.', '.', '.'}, {'.', '.', '.'}};
void drawbrd() {
  printf("\n\n");
  printf(" %c | %c | %c \n", board[0][0], board[0][1], board[0][2]);
  printf(" %c | %c | %c \n", board[1][0], board[1][1], board[1][2]);
  printf(" %c | %c | %c \n", board[2][0], board[2][1], board[2][2]);
}

void movebrd(int x, int y, char p) {
  if (board[x][y] == '.') {
    board[x][y] = p;
  } else {
    printf("invalid move! already occupied.\n");
  }
}

char winner() {
  // rows
  for (int i = 0; i < 3; ++i) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '.') {
      return board[i][0];
    }
  }

  // columns
  for (int i = 0; i < 3; ++i) {
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '.') {
      return board[0][i];
    }
  }

  // diag
  if ((board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '.') ||
        (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '.')) {
        return board[1][1];
  }

  // check tie
  for (int i = 0; i < 3; ++i) {
  for (int j=0; j<3; ++j) {
    if (board[i][j] == '.') return '.';
  }
  }

  return 'T';
}


int main() {
  char pl = 'X';
  int row, col;
  char win = ' ';

  while (1) {
    drawbrd();
    if (pl == 'X') {
      char rowS[2], colS[2];
      printf("input (col 1-3, row 1-3): ");
      colS[0] = getch(); colS[1] ='\0';
      rowS[0] = getch(); rowS[1] = '\0';
      col = atoi(colS)-1;
      row = atoi(rowS)-1;
    } else {
      srand(time(NULL));
      do {
        row = rand()%3;
        col = rand()%3;
      } while (board[row][col] != '.');
    }

    if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] != '.') {
      printf("invalid move\n");
      continue;
    }
    movebrd(row, col, pl);
    win = winner();

    if (win != '.') {
      printf("\n");
      drawbrd();
      if (win == 'T') printf("tie");
      else printf("%c wins!\n", win);
      break;
    }

    pl = (pl == 'X') ? 'O' : 'X';
  }
  
  return 0;
};
```
{% endraw %}


someone make a browser port


---

cute video
<video src="{{ "/img/whydidhedothis.mp4" | url }}" controls width="400"></video>
