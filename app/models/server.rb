class Server < ApplicationRecord

  DEFALUT_PHOTO_URL = "https://s3.us-west-1.amazonaws.com/disgo-dev/server_img.png?response-content-disposition=inline&X-Amz-Security-Token=AgoGb3JpZ2luECUaCXVzLXdlc3QtMSKAAnLlobVAC7EkC75BsbCqSKRWt%2BQr57W55dX2S9KZdg1oziX91Cp2X6%2F46c4UkkdPZVkszH%2Bn0aX03WF%2FvXIjWPdATjZSJvoFbW%2F6w6sdbDIZJMR%2BUASoCgdUGBRFAW3eo9lJp0QQVDf2gmLmLKkS6ludBd8lCxpGL%2BHtlCtL1nvkW5RYhLe8QuHx4VAxGy2yhivM3cNSJlXmTj6dHQFtyKhzcOo03oASzDrVoWoTpdJjr%2Fw8Nhhmt6WucSvtPIVhMVQZ1iqx2DqZwen8OmJVs0Txa3wj4q2xdpplr89gqLNISwe7omtTvw%2BZa3a7vBqJ7AGcjmOStME%2FV4bLKJfGyqoq2wMIGxAAGgw3OTIxMTk1NjY3MzciDIqrvdrVX1z%2BGmYFAiq4A57l5UNHnGqQnc8EnHoJ3W31bWYhE6ZWTRRwT5MLOIIGc3cDW8%2BZtB1SBraFwVtzlDSmW3bNpFYquRn0c7XC9vZee5PJe9gbaomRDsuBOeuvVBCfwNDIx5JBfs7CnXnvu9GdrwO%2BZWigkBdTpmlf7ervRvmGOdKrpFrGmr%2BijEETOP9bEhbSNrI2ePE5ex2feSssBPb7tJ9apPuU1KTzkLayfqzAtTZcRr60d4o0C7Pkm7COHUyWqRUB%2FaxBEoNN1ZSFcVRZjGU7g5UYnjamWFlcTLS1Ael1z6tOUbcVAwxXc87cvG48CH%2FjEFdzkqD0x%2FI9ABFJoqH84zS1sjK%2FPQ6MtTh2PVCs4mZ%2FfBjBl9CrImPv4lQbbjLunSaU4KpL99erjeDFtzYZROdzSc7ueSUYW9rQipAjbXIr0TLez6au3e7480o3gdNrOkbUDsDdnxoxEzCHK1XfjQ6apZa6bw37V8iq6pGe6Igw5x%2Fl8ZJLri6HHi7YHOMtKKY3ektI2uvI5xnX%2F96yiw4sbecCUCpxEhvBZKDKsLDY7AN06ORT%2FfbycnqcaZRTQPCZOGuoBkAOd9GwZdBfMP%2F4sdsF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180809T222009Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3Q3QBMGIR7J3YH7Z%2F20180809%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=755f26272df9642b34144ddbb5c72897f900d0d0f7f88aefb35555cd03f5e0de"

  validates :name, :img_url, presence: true
  validates :name, uniqueness: true

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User

  has_one_attached :photo

  after_initialize :ensure_img_url

  private
  def ensure_img_url
    self.img_url = DEFAULT_PHOTO_URL
  end

end
