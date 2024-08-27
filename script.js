function enterValue(a) {
    document.getElementById('display').value += a;
  }
  
  function clearValue() {
    document.getElementById('display').value = '';
  }
  
  function output() {
    try {
      const shishir = eval(document.getElementById('display').value);
      document.getElementById('display').value = shishir;
    } catch (error) {
      document.getElementById('display').value = 'Error';
    }
  }
  