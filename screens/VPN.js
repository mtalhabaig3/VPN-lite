import React, { Component, useState } from "react";
import { Image, Modal, StyleSheet, ScrollView, View } from "react-native";
import { Block, Button, Text, Utils } from "expo-ui-kit";
import BackButton from "../components/BackButton";
import { images, theme, servers } from "../constants";
import CircularProgress from "react-native-circular-progress-indicator";

const { icons } = images;

// theme
const { rgba } = Utils;
const { SIZES, COLORS } = theme;

const VPN = () => {
  const [connected, setConnected] = useState(false);
  const [server, setServer] = useState(false);
  const [show, setShow] = useState(false);
  const [automatic, setAutomatic] = useState({
    name: "Automatic",
    icon: icons.automatic,
  });
  const [loader, setLoader] = useState(false);
  const [temp, setTemp] = useState(false);

  function handleConnect() {
    setConnected(!connected);
  }

  function handleServer(server) {
    setServer(server);
    setConnected(false);
    setShow(false);
  }

  function renderServer() {
    const connection = server || automatic;

    return (
      <Block flex={false} row center middle>
        <Image source={connection.icon} />
        <Text margin={[0, 10, 0, 20]} color="white" bold>
          {connection.name}
        </Text>
        <Image source={icons.dropdown} />
      </Block>
    );
  }

  function renderServers() {
    const connection = server || automatic;

    return (
      <Modal visible={show} animationType="fade" transparent>
        <Block bottom color={rgba(COLORS.gray, 0.2)}>
          <Block flex={false} white middle padding={[SIZES.padding, 0]}>
            <Text subtitle center gray>
              Pick your Server
            </Text>
            <ScrollView>
              {servers.map((item) => {
                const isConnected = connection.name === item.name;
                const isChecked = icons[isConnected ? "checked" : "unchecked"];
                return (
                  <Button
                    transparent
                    key={`server-${item.name}`}
                    onPress={() => handleServer(item)}
                  >
                    <Block
                      flex={false}
                      row
                      center
                      space="between"
                      margin={[SIZES.padding, SIZES.padding]}
                    >
                      <Block flex={false} row center>
                        <Image source={item.icon} />
                        <Text padding={[0, SIZES.h3]}>{item.name}</Text>
                      </Block>
                      <Image source={isChecked} />
                    </Block>
                  </Button>
                );
              })}
            </ScrollView>
          </Block>
        </Block>
      </Modal>
    );
  }

  return (
    <Block safe center space="between" style={{ backgroundColor: "#fad860" }}>
      {/* <BackButton goBack={() => navigation.goBack()} /> */}
      {loader && (
        <View style={{ position: "absolute", top: 347.5 }}>
          <CircularProgress
            radius={99}
            value={100}
            textColor="#222"
            fontSize={20}
            valueSuffix={"%"}
            inActiveStrokeColor={"#2ecc71"}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={3000}
            onAnimationComplete={() => {
              setLoader(false), setTemp(true);
            }}
          />
        </View>
      )}
      <Block flex={false} padding={[SIZES.h3, 0]}>
        <Text title semibold>
          VPN
        </Text>
      </Block>
      <Block center flex={false}>
        <Block
          flex={false}
          row
          center
          middle
          white
          shadow
          radius={SIZES.radius}
          padding={[SIZES.base, SIZES.padding]}
        >
          <Text theme={theme} subtitle semibold gray height={SIZES.h3}>
            {temp ? "Connected" : "Disconnected"}
          </Text>
          <Block
            flex={false}
            radius={SIZES.base}
            style={styles.status}
            color={temp ? COLORS.success : rgba(COLORS.gray, 0.5)}
          />
        </Block>

        <Image
          style={styles.image}
          source={icons[temp ? "online" : "offline"]}
        />

        <Button
          theme={theme}
          outlined={connected}
          style={[
            styles.connect,
            connected && styles.connected,
            { backgroundColor: "#f76b1c" },
          ]}
          onPress={() => {
            setConnected(!connected);
            if (connected === false) {
              setLoader(true);
            } else {
              setLoader(false);
              setTemp(false);
            }
          }}
        >
          <Text
            caption
            center
            bold
            white={!connected}
            margin={[SIZES.padding / 2, 0]}
          >
            {connected ? "DISCONNECT" : "CONNECT NOW"}
          </Text>
        </Button>
      </Block>
      <Block flex={false} middle white shadow style={styles.servers}>
        <Button transparent onPress={() => setShow(true)}>
          {renderServer()}
        </Button>
      </Block>
      {renderServers()}
    </Block>
  );
};

export default VPN;

const styles = StyleSheet.create({
  connect: {
    width: SIZES.width / 2,
  },
  connected: {
    borderColor: COLORS.black,
  },
  image: {
    width: 180,
    height: 180,
    marginVertical: 20,
  },
  status: {
    width: SIZES.base,
    height: SIZES.base,
    marginLeft: SIZES.small,
  },
  servers: {
    width: SIZES.width,
    height: SIZES.base * 9,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.05,
    shadowRadius: SIZES.base / 2,
    backgroundColor: "#f76b1c",
    borderRadius: 50,
  },
});
