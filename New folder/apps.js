import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Linking } from 'react-native';
import email from 'react-native-email';

const WithdrawalConfirmation = ({ method }) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const countdownDuration = method === 'Crypto' ? 10 : 30;
    setCountdown(countdownDuration * 24 * 60 * 60); // Convert days to seconds

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [method]);

  const handleEmailPress = (emailAddress, subject, body) => {
    const to = [emailAddress];
    email(to, {
      subject: subject,
      body: body,
    }).catch(console.error);
  };

  const handleMoreInfoPress = () => {
    Alert.prompt('More Information', 'Please enter your message:', (message) => {
      if (message) {
        handleEmailPress('claudiawarnertrb@gmail.com', 'More Information', message);
      }
    });
  };

  const formatCountdown = () => {
    const days = Math.floor(countdown / (24 * 60 * 60));
    const hours = Math.floor((countdown % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((countdown % (60 * 60)) / 60);
    const seconds = countdown % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdrawal Process Already Started</Text>
      <Text style={styles.text}>
        Your withdrawal process has already started. If you wish to stop the withdrawal, please contact our support team immediately.
      </Text>
      <Text style={styles.text}>
        If more than 30 days have passed since you received your QFS Wallet and your funds have not yet appeared in your bank account, please contact us at
      </Text>
      <Text style={styles.emailLink} onPress={() => handleEmailPress('claudiawarnertrb@gmail.com', 'Withdrawal Inquiry', 'Hello Claudia,\n\nI would like more information regarding my withdrawal process. Thank you!')}>
        claudiawarnertrb@gmail.com
      </Text>
      <Button title="Click here for more information" onPress={handleMoreInfoPress} color="#00ffcc" />
      <Text style={styles.countdown}>{formatCountdown()}</Text>
      <View style={styles.apology}>
        <Text style={styles.apologyTitle}>We Sincerely Apologize</Text>
        <Text style={styles.apologyText}>
          We understand there has been a lot of confusion regarding cashouts, and many clients have experienced delays in receiving their funds. Please know that we are working diligently to resolve these issues and expedite the process for everyone. Your patience is greatly appreciated as we navigate these challenges together. Thank you for choosing us!
        </Text>
      </View>
      <Text style={styles.footer}>AMERICAN DREAM QFS © 2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f54',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#d4f1ff',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  emailLink: {
    color: '#00ffcc',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  countdown: {
    fontSize: 18,
    color: 'lime',
    marginVertical: 20,
  },
  apology: {
    backgroundColor: 'rgba(0, 72, 145, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    width: '100%', // Responsive width
  },
  apologyTitle: {
    fontSize: 20,
    color: '#d4f1ff',
  },
  apologyText: {
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    color: '#ccc',
    marginTop: 40,
  },
});

export default WithdrawalConfirmation;
