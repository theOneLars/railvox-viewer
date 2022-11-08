import {Verkehrsperiode} from "./verkehrsperiode";
import * as moment from "moment";

describe('Verkehrsperiode', () => {

  it('should parse days', () => {
    let testee = new Verkehrsperiode('1', '17', '2021-12-12T00:00:00.000+01:00', '2022-12-10T23:59:59.000+01:00', 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
    expect(testee.fromDate.toString()).toEqual(moment([2021, 12-1, 12]).toString());
    expect(testee.toDate.toString()).toEqual(moment([2022, 12-1, 10]).toString());
  });

  it('should convert bitmask number of days', () => {
    let testee = new Verkehrsperiode('1', '17', '2021-12-12T00:00:00.000+01:00', '2021-12-22T23:59:59.000+01:00', 'ffffff');
    expect(testee.getNumberOfDays()).toEqual(10);
  });

  it('should parse hex bitmask to binary', () => {
    let testee = new Verkehrsperiode('1', '17', '2021-12-12T00:00:00.000+01:00', '2022-12-10T23:59:59.000+01:00', 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
    expect(testee.getBinaryBitmask()).toBe('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
  });

  it('should detect date out of range', () => {
    let testee = new Verkehrsperiode('1', '17', '2021-12-12T00:00:00.000+01:00', '2022-12-10T23:59:59.000+01:00', 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

    expect(testee.isValidOnDay(moment([2021, 12-1, 11]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2022, 12-1, 11]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2022, 12-1, 10]))).toBeTrue();
    expect(testee.isValidOnDay(moment([2021, 12-1, 12]))).toBeTrue();
    expect(testee.isValidOnDay(moment([2022, 1-1, 1]))).toBeTrue();
  });

  it('should detect of valid for day with 4 binary digits ', () => {
    let testee = new Verkehrsperiode('1', 'test', '2021-12-14', '2021-12-17', '0');
    expect(testee.isValidOnDay(moment([2021, 12-1, 14]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 15]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 16]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 17]))).toBeFalse();

    testee = new Verkehrsperiode('1', 'test', '2021-12-14', '2021-12-17', '1');
    expect(testee.isValidOnDay(moment([2021, 12-1, 14]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 15]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 16]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 17]))).toBeTrue();

    testee = new Verkehrsperiode('1', 'test', '2021-12-14', '2021-12-17', '4');
    expect(testee.isValidOnDay(moment([2021, 12-1, 14]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 15]))).toBeTrue();
    expect(testee.isValidOnDay(moment([2021, 12-1, 16]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 17]))).toBeFalse();

    testee = new Verkehrsperiode('1', 'test', '2021-12-14', '2021-12-17', '8');
    expect(testee.isValidOnDay(moment([2021, 12-1, 14]))).toBeTrue();
    expect(testee.isValidOnDay(moment([2021, 12-1, 15]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 16]))).toBeFalse();
    expect(testee.isValidOnDay(moment([2021, 12-1, 17]))).toBeFalse();
  });

  it('should detect of valid for day with 16 binary digits ', () => {

    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-4', '0').getBinaryBitmask()).toEqual('0000');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-4', '8').getBinaryBitmask()).toEqual('1000');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-4', '4').getBinaryBitmask()).toEqual('0100');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-4', '2').getBinaryBitmask()).toEqual('0010');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-4', '1').getBinaryBitmask()).toEqual('0001');

    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '00').getBinaryBitmask()).toEqual('00000');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '80').getBinaryBitmask()).toEqual('10000');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '40').getBinaryBitmask()).toEqual('01000');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '20').getBinaryBitmask()).toEqual('00100');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '10').getBinaryBitmask()).toEqual('00010');
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '10').getBinaryBitmask()).toEqual('00010');

    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '80').isValidOnDay(moment([2021, 12-1, 1]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '40').isValidOnDay(moment([2021, 12-1, 2]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '20').isValidOnDay(moment([2021, 12-1, 3]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '10').isValidOnDay(moment([2021, 12-1, 4]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-5', '01').isValidOnDay(moment([2021, 12-1, 5]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-6', '01').isValidOnDay(moment([2021, 12-1, 6]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-7', '01').isValidOnDay(moment([2021, 12-1, 7]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-8', '01').isValidOnDay(moment([2021, 12-1, 8]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-9', '001').isValidOnDay(moment([2021, 12-1, 9]))).toBeTrue();
    expect(new Verkehrsperiode('1', 'test', '2021-12-1', '2021-12-9', '800').isValidOnDay(moment([2021, 12-1, 1]))).toBeTrue();

  });


});
