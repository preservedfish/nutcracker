import React from 'react';
import {
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import frequencies from '../../images/frequencies.PNG';
import vigenere from '../../images/vigenere.PNG';
import other from '../../images/other.PNG';

const Sidebar = () => (
  <Tabs>
    <TabList>
      <Tab>Frequencies</Tab>
      <Tab>Vigenère Table</Tab>
      <Tab>Other Tables</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Image src={frequencies} alt="English and Spanish Frequencies" />
      </TabPanel>
      <TabPanel>
        <Image src={vigenere} alt="Vigenere Table" />
      </TabPanel>
      <TabPanel>
        <Image src={other} alt="Other Tables" />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default Sidebar;
