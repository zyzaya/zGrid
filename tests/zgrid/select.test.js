/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Select', () => {
  // 1. clicking row sets the selection to that row
  // 2. select -> set filter / pagination such that selection is no
  // longer visible doesn't lose selection. reseting filter/pagination then keeps seleciton
  // 3. sorting maintains the correctly displayed selection
});
