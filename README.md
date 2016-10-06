# assignment_djello
Project management with that great wobbly taste.

Cards
- title: string
- body: text
- completed: bool
- members: association
- activities: association ('Activities Feed')


Boards
- title: string
- description: text
- lists: association

Lists
- title: string
- description: text
- cards: association

Members
Activities
