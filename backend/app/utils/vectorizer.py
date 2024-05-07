from sklearn.feature_extraction.text import TfidfVectorizer

'''
This function takes a data_column and converts it into a vectorized matrix using TfidfVectorizer
'''
def get_vectorized_matrix(data_column):
    vectorizer = TfidfVectorizer()
    # data_column = data_column.apply(lambda x: ' '.join(x))
    vectorized_matrix = vectorizer.fit_transform(data_column)
    return vectorized_matrix