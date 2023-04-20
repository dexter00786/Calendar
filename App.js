import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const App = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState();
  const [month, setMonth] = useState('');
  const [startDates, setStartDates] = useState('');
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [lastDate, setLastDate] = useState('');
  const [isLastDatePicked, setIsLastDatePicked] = useState(false);
  const [markedDate, setMarkedDate] = useState({});
  const [update, setupdate] = useState(false);

  const calendarRef = useRef();
  const m = moment();
  useEffect(() => {
    setCurrentDate(moment(new Date()).format('YYYY-MM-DD'));
    setCurrentMonth(moment(new Date()).format('MMMM, YYYY'));
    // const listen = props.
  }, []);
  useEffect(() => {
    console.log(currentDate);
    setupdate(true);
  }, [onLeftArrow]);

  const onDayPress = day => {
    if (isStartDatePicked == false) {
      let markedDates = {};
      markedDates[day.dateString] = {
        startingDay: true,
        color: 'red',
        textColor: '#FFFFFF',
      };
      setMarkedDate(markedDates);
      setIsStartDatePicked(true);
      setIsLastDatePicked(false);
      setStartDates(day.dateString);
    } else {
      let markedDates = markedDate;
      let endDate = moment(day.dateString);
      let startDate = moment(startDates);
      let range = endDate.diff(startDates, 'days');
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          console.warn(tempDate);
          if (i < range) {
            markedDates[tempDate] = {color: 'grey', textColor: '#ffffff'};
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: 'red',
              textColor: '#ffffff',
            };
            setLastDate(tempDate.toString());
          }
        }
        setMarkedDate(markedDates);
        setIsLastDatePicked(true);
        setIsStartDatePicked(false);
      } else alert('Pick an upcoming date');
    }
  };

  const getCurrentMonth = () => {
    setCurrentDate(moment(new Date()).format('YYYY-MM-DD'));
    setCurrentMonth(moment(new Date()).format('MMMM, YYYY'));
  };

  const onRightArrow = async () => {
    var cDate = moment(currentDate);
    var futureMonth = moment(cDate).add(1, 'M');
    var futureMonthEnd = moment(futureMonth).endOf('month');

    if (
      cDate.date() != futureMonth.date() &&
      futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
    ) {
      futureMonth = futureMonth.add(1, 'd');
    }
    setCurrentDate(futureMonth.format('YYYY-MM-DD'));
    setCurrentMonth(futureMonth.format('MMMM, YYYY'));
  };
  const onLeftArrow = () => {
    var cDate = moment(currentDate);
    var futureMonth = moment(cDate).subtract(1, 'M');
    var futureMonthEnd = moment(futureMonth).endOf('month');

    if (
      cDate.date() != futureMonth.date() &&
      futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
    ) {
      futureMonth = futureMonth.subtract(1, 'd');
    }
    // setCurrentDate(null)
    let currentMonthDate= futureMonth.format('YYYY-MM-DD').toString();
    console.log(currentMonthDate,'currentMonthDate####')
    setCurrentDate(futureMonth.format('YYYY-MM-DD').toString());
    setCurrentMonth(futureMonth.format('MMMM, YYYY'));

  };
  const customHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 17,
          flexDirection: 'row',
          height: 40,
          width: '100%',
          backgroundColor: '#ffb677',
          borderColor: 'green',
        }}>
        <View
          style={{
            flex: 0.5,
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>
            {currentMonth}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => onLeftArrow()}>
            <Image
              source={require('./Assets/back.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRightArrow()}>
            <Image
              source={require('./Assets/forward.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  console.log('currentDate#####----------',currentDate)
  const renderCalendar = () => {
    return (
      <View>
        <Calendar
          // ref={calendarRef}
          current={currentDate}
          headerStyle={styles.header}
          disabledDaysIndexes={[5, 6]}
          renderHeader={customHeader}
          enableSwipeMonths={true}
          hideArrows={true}
          firstDay={0}
          hideExtraDays={true}
          onDayPress={day => onDayPress(day)}
          markingType={'period'}
          markedDates={markedDate}
          theme = {{
            selectedDayTextColor : "red"
          }}
        >
          {currentDate}
        </Calendar>
      </View>
    );
  };

  return (
    
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.mainHeader}>
            <Text style={styles.mainHeading}>Select Date {currentDate}</Text>
          </View>
          <View style={styles.calendarView}>{renderCalendar()}</View>
          <View style={styles.selectionArea}>
            <View style={styles.dateSelectionArea}>
              <View style={styles.dateArea}>
                <Text>Check In Date :</Text>
                <Text>{startDates}</Text>
              </View>
              <View style={styles.dateArea}>
                <Text>Check Out Date : </Text>
                <Text>{lastDate}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.btn,
                {backgroundColor: '#547dd9', borderColor: '#547dd9'},
              ]}>
              <Text style={styles.btnText}>Choose</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {backgroundColor: '#f05968', borderColor: '#f05968'},
              ]}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
};

export default React.memo(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainHeader: {
    flex: 0.1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    borderWidth: 1,
    // borderRadius : 17,
    // backgroundColor : "red",
    height: 80,
    justifyContent: 'space-between',
  },
  calendarView: {
    flex: 0.5,
    borderWidth: 1,
    justifyContent: 'center',
  },
  selectionArea: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dateSelectionArea: {
    flex: 0.3,
    flexDirection: 'row',
    borderWidth: 1,
  },
  dateArea: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#547dd9',
    borderWidth: 1,
    borderColor: '#547dd9',
    borderRadius: 27,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
