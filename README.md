# A simple Node.js Chat server (over TCP)

- send/receive messages

### Usage

    $ npm install -g git+ssh://git@github.com:denistsoi/chat.git

#### Server

    $ start-chat-server [-p $PORT] # defaults to 5555
    $ telnet localhost 5555 # to test server func

#### Client

    $ join-chat -n $NAME [-h $HOST] [-p $PORT] # defaults to localhost 5555
