import requests
import json
import time
import numpy as np

do_request = lambda payload: requests.post('http://127.0.0.1:3000/api/data', data={'data': json.dumps(payload)})
smiles: [str] = ['bad','medium', 'good']
gender: [str] = ['male', 'female', 'wtf']
pleasures: [str] = ['happy', 'bored', 'funny', 'sweet', 'annoying']
emotions: [str] = ['happy', 'excited', 'bored', 'stressy']

sleeptime = lambda: np.random.choice(np.arange(0.1, 2,.001))

def main() -> None:
    while True:
        print(do_request({'topic': 'smile_state', 'state': np.random.choice(smiles)}).status_code)
        time.sleep(sleeptime())
        print(do_request({'topic': 'gender', 'gender': np.random.choice(gender)}).status_code)
        time.sleep(sleeptime())
        print(do_request({'topic': 'pleasure_state', 'state': np.random.choice(pleasures)}).status_code)
        time.sleep(sleeptime())
        print(do_request({'topic': 'emotion_state', 'state': np.random.choice(emotions)}).status_code)
        time.sleep(sleeptime())

if __name__ == '__main__':
    main()