import requests
import json
import time
import numpy as np

do_request = lambda payload: requests.post('http://localhost:3000/api/data', data={'data': json.dumps(payload)})
smiles = ['bad','medium', 'good']
gender = ['male', 'female', 'wtf']
pleasures = ['happy', 'bored', 'funny', 'sweet', 'annoying']
emotions = ['happy', 'excited', 'bored', 'stressy']

def main() -> None:
    for i in range(10):
        time.sleep(.2)
        print(do_request({'topic': 'smile_state', 'state': np.random.choice(smiles)}).status_code)
        time.sleep(.2)
        print(do_request({'topic': 'gender', 'gender': np.random.choice(gender)}).status_code)
        time.sleep(.2)
        print(do_request({'topic': 'pleasure_state', 'state': np.random.choice(pleasures)}).status_code)
        time.sleep(.2)
        print(do_request({'topic': 'emotion_state', 'state': np.random.choice(emotions)}).status_code)


if __name__ == '__main__':
    main()