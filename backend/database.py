from enum import Enum
import json, re
import pandas as pd

class Response(Enum):
    SUCCESS = 1
    WRONG_LENGTH = 2
    INVALID_CODE = 3
    NOT_FOUND = 4

class Database:
    def __init__(self):
        with open('./data/database.json') as file:
            database = json.load(file)
            self.database = pd.DataFrame.from_dict(database)

        with open('./data/movement.json') as file:
            self.movement = json.load(file)

        with open('./data/active.json') as file:
            self.active_list = json.load(file)

        with open('./data/passive.json') as file:
            self.passive_list = json.load(file)

        with open('./data/otherInterested.json') as file:
            self.other_list = json.load(file)

        with open('./data/court.json') as file:
            self.court_list = json.load(file)

        with open('./data/judgeBody.json') as file:
            self.judgeBody_list = json.load(file)

        with open('./data/judgeClass.json') as file:
            self.judgeClass_list = json.load(file)

        with open('./data/jurisdiction.json') as file:
            self.jurisdiction_list = json.load(file)

    def __convert_keys(self, participant_item):
        replace_keys = {
            'tipo_participante': 'type',
            'ativo': 'is_active',
            'nome': 'name',
        }

        for key, value in replace_keys.items():
            if key not in participant_item:
                continue
            participant_item[value] = participant_item.pop(key)
        return participant_item

    def get_active(self, lawsuit_id):
        participants = self.active_list.get(lawsuit_id)
        participants = [self.__convert_keys(participant) for participant in participants]
        participants = [participant for participant in participants if 'type' in participant]
        if len(participants) == 0:
            return {}
        return participants

    def get_passive(self, lawsuit_id):
        participants = self.passive_list.get(lawsuit_id)
        participants = [self.__convert_keys(participant) for participant in participants]
        if len(participants) == 0:
            return []
        return participants

    def get_others(self, lawsuit_id):
        participants = self.other_list.get(lawsuit_id)
        participants = [self.__convert_keys(participant) for participant in participants]
        if len(participants) == 0:
            return []
        return participants

    def get_movement(self, lawsuit_id):
        movement = self.movement.get(lawsuit_id)
        if len(movement) == 0:
            return []
        return movement

    def get_court_list(self):
        return self.court_list

    def get_judge_class_list(self):
        return self.judgeClass_list

    def get_judge_body_list(self):
        return self.judgeBody_list

    def get_jurisdiction_list(self):
        return self.jurisdiction_list

    def search(self, argument):
        data = self.database
        columns = list(self.database.columns)

        pattern = re.compile('\d{20}')
        if pattern.match(argument.strip()):
            argument = argument.replace('.', '')
            argument = argument.replace('-', '')

        searched = [False for _ in range(len(data))]
        for column in columns:
            have_item = data[column].str.contains(argument, na=False, case=False)
            have_item = list(have_item)
            searched = [item[0] or item[1] for item in zip(searched, have_item)]

        for i in range(len(searched)):
            if searched[i]:
                continue

            lawsuitID = data.iloc[i]['lawsuitID']
            others = self.get_others(lawsuitID)
            others = others
            others = [str(other).lower() for other in others]
            others = ' '.join(others)
            
            actives = self.get_active(lawsuitID)
            actives = actives
            actives = [str(active).lower() for active in actives]
            actives = ' '.join(actives)
            
            passives = self.get_passive(lawsuitID)
            passives = passives
            passives = [str(passive).lower() for passive in passives]
            passives = ' '.join(passives)

            if argument.lower() in f"{others} {actives} {passives}":
                searched[i] = True

        data = data[searched]

        values = list(data.values)
        values = [zip(columns, value) for value in values]
        values = [dict(value) for value in values]
        values = sorted(values, key=lambda x: x['date'], reverse=True)

        return values

    def filtered_search(self, **kwargs):
        data = self.database
        columns = list(self.database.columns)

        if 'search' in kwargs:
            query = ''
            argument = kwargs.pop('searchArgument')
            pattern = re.compile('\d{20}')
            if pattern.match(argument.strip()):
                argument = argument.replace('.', '')
                argument = argument.replace('-', '')
            for column in columns:
                if query[-1] != '|':
                    query += ' | '
                query += f"'{argument}' in {column}"
            data = data.query(query)

        for key, arg in kwargs.items():
            if arg is None:
                continue
            have_item = data[key].str.contains(arg, na=False, case=False)
            data = data[have_item]

        values = list(data.values)
        values = [zip(columns,value) for value in values]
        values = [dict(value) for value in values]
        values = sorted(values, key=lambda x: x['date'], reverse=True)

        return values

    def get_process(self, lawsuit_id):
        process = self.database.query(f"lawsuitID == '{lawsuit_id}'")
        if len(process) == 0:
            return
        labels = list(self.database.columns)
        values = process.values[0]
        return dict(zip(labels, values))