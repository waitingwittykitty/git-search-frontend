import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD3qLc9LIfH1n7Dudg6YZaMD_92tW4Zp1I',
  authDomain: 'git-search-ff826.firebaseapp.com',
  projectId: 'git-search-ff826',
  storageBucket: 'git-search-ff826.appspot.com',
  messagingSenderId: '261117424452',
  appId: '1:261117424452:web:e5970be5484d91ea6c9d11',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
