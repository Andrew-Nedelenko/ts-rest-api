import { expect } from 'chai';
import dotenv from 'dotenv';
import {
  port, dbname, dbhost, dbpass, dbuser,
} from '../src/utils/env-config';

dotenv.config();

describe('env checking for undefined', () => {
  it('should have a value', () => {
    expect(process.env.PORT).to.equal(port);
    expect(process.env.DBHOST).to.equal(dbhost);
    expect(process.env.DBNAME).to.equal(dbname);
    expect(process.env.DBUSER).to.equal(dbuser);
    expect(process.env.DBPASS).to.equal(dbpass);
  });
});
